using AutoMapper;
using DigitalTwins.Common.DTOs.User;
using DigitalTwins.Common.Enums;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.User;

public class AcceptInvitationCommand : IRequest<UserDTO>
{
    public string Name { get; set; } = string.Empty;
    
    public string InvitationCode { get; set; } = string.Empty;
}

public class AcceptInvitationCommandValidator : AbstractValidator<AcceptInvitationCommand>
{
    public AcceptInvitationCommandValidator()
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

public class AcceptInvitationCommandHandler : IRequestHandler<AcceptInvitationCommand, UserDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public AcceptInvitationCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<UserDTO> Handle(AcceptInvitationCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.InvitationCode == request.InvitationCode, cancellationToken)
            ?? throw new KeyNotFoundException("User not found");

        user.Name = request.Name;
        user.Status = UserStatus.Active;
        user.UpdatedAt = DateTime.Now;

        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserDTO>(user);
    }
}