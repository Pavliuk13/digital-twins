using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.User;
using DigitalTwins.Common.Enums;
using DigitalTwins.DAL.Context;
using DigitalTwins.DAL.Entities;
using FluentValidation;
using MediatR;

namespace DigitalTwins.BLL.Commands.User;

public class InviteUserCommand : IRequest<UserDTO>
{
    public string Email { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;
}

public class InviteUserCommandValidator : AbstractValidator<InviteUserCommand>
{
    public InviteUserCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("User name cannot be empty")
            .MaximumLength(100)
            .WithMessage("User name cannot be longer then 100 symbols")
            .MinimumLength(2)
            .WithMessage("User name should have at least 2 symbols");

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email cannot be empty")
            .EmailAddress()
            .WithMessage("Wrong email address format");
    }
}

public class InviteUserCommandHandler : IRequestHandler<InviteUserCommand, UserDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;

    public InviteUserCommandHandler(
        DigitalTwinContext context, 
        ICurrentUserService currentUserService, 
        IMapper mapper,
        IEmailService emailService
        )
    {
        _context = context;
        _currentUserService = currentUserService;
        _mapper = mapper;
        _emailService = emailService;
    }
    
    public async Task<UserDTO> Handle(InviteUserCommand request, CancellationToken cancellationToken)
    {
        var organizationId = 1;
        
        var user = new DAL.Entities.User
        {
            Name = request.Name,
            Email = request.Email,
            Status = UserStatus.Pending,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            InvitationCode = Guid.NewGuid().ToString()
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);
        
        var userOrganizationRole = new UserOrganizationRole
        {
            OrganizationId = organizationId,
            RoleId = _context.Roles.FirstOrDefault(x => x.Name == "User")?.Id ?? 0,
            UserId = user.Id
        };
        
        _context.UserOrganizationRoles.Add(userOrganizationRole);

        await _context.SaveChangesAsync(cancellationToken);

        await _emailService.SendInvitationAsync(user.Name, user.Email, user.InvitationCode);

        return _mapper.Map<UserDTO>(user);
    }
}