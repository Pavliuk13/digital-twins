using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.User;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.User;

public class UpdateUserCommand : IRequest<UserDTO>
{
    public string Name { get; set; } = string.Empty;
}

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    public UpdateUserCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("User name cannot be empty")
            .MaximumLength(100)
            .WithMessage("User name cannot be longer then 100 symbols")
            .MinimumLength(2)
            .WithMessage("User name should have at least 2 symbols");
    }
}

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UserDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public UpdateUserCommandHandler(DigitalTwinContext context, ICurrentUserService currentUserService, IMapper mapper)
    {
        _context = context;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }
    
    public async Task<UserDTO> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUser();

        var userDb = await _context.Users.FirstOrDefaultAsync(x => x.Id == user.Id, cancellationToken)
            ?? throw new KeyNotFoundException("User not found");

        userDb.Name = request.Name;
        userDb.UpdatedAt = DateTime.Now;

        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserDTO>(userDb);
    }
}