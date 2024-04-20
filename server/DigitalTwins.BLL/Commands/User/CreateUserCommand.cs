using AutoMapper;
using DigitalTwins.Common.DTOs.User;
using DigitalTwins.Common.Enums;
using DigitalTwins.DAL.Context;
using DigitalTwins.DAL.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.User;

public class CreateUserCommand : IRequest<UserDTO>
{
    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
}

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
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

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, UserDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public CreateUserCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<UserDTO> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new DAL.Entities.User
        {
            Name = request.Name,
            Email = request.Email,
            Status = UserStatus.Active,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);

        await CreateDefaultOrganization(user.Id, user.Name, cancellationToken);

        return _mapper.Map<UserDTO>(user);
    }

    private async Task CreateDefaultOrganization(long userId, string userName, CancellationToken cancellationToken)
    {
        var organization = new Organization
        {
            Name = $"{userName}'s organization",
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        };

        _context.Organizations.Add(organization);
        await _context.SaveChangesAsync(cancellationToken);

        var organizationPermissionRoles = _context.Roles.AsNoTracking()
            .SelectMany(role => _context.Permissions.AsNoTracking(), 
                (role, permission) => new OrganizationPermissionRole
            {
                OrganizationId = organization.Id,
                RoleId = role.Id,
                PermissionId = permission.Id
            }).ToList();

        _context.OrganizationPermissionRoles.AddRange(organizationPermissionRoles);

        var userOrganizationRole = new UserOrganizationRole
        {
            OrganizationId = organization.Id,
            RoleId = _context.Roles.FirstOrDefault(x => x.Name == "Admin")?.Id ?? 0,
            UserId = userId
        };

        _context.UserOrganizationRoles.Add(userOrganizationRole);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
