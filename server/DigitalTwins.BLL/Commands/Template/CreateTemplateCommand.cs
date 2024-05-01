using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.Template;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Template;

public class CreateTemplateCommand : IRequest<TemplateDTO>
{
    public string Name { get; set; } = string.Empty;

    public string Hardware { get; set; } = string.Empty;

    public string ConnectionType { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
}

public class CreateTemplateCommandValidator : AbstractValidator<CreateTemplateCommand>
{
    public CreateTemplateCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name of template can't be empty")
            .NotNull()
            .WithMessage("Name of template can't be null")
            .MaximumLength(100)
            .WithMessage("Name of template can't be more than 100 symbols");
        
        RuleFor(x => x.Hardware)
            .NotEmpty()
            .WithMessage("Hardware can't be empty")
            .NotNull()
            .WithMessage("Hardware can't be null")
            .MaximumLength(15)
            .WithMessage("Hardware name can't be more than 15 symbols");
        
        RuleFor(x => x.ConnectionType)
            .NotEmpty()
            .WithMessage("ConnectionType can't be empty")
            .NotNull()
            .WithMessage("ConnectionType can't be null")
            .MaximumLength(15)
            .WithMessage("ConnectionType name can't be more than 15 symbols");
        
        RuleFor(x => x.Description)
            .MaximumLength(500)
            .WithMessage("Description can't be more than 500 symbols");
    }
}

public class CreateTemplateCommandHandler : IRequestHandler<CreateTemplateCommand, TemplateDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public CreateTemplateCommandHandler(DigitalTwinContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }
    
    public async Task<TemplateDTO> Handle(CreateTemplateCommand request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUser();
        
        var organizationId = (await _context.Users.AsNoTracking().Where(x => x.Id == user.Id)
                            .Include(x => x.UserOrganizationRoles)
                            .Select(x => x.UserOrganizationRoles.FirstOrDefault())
                            .FirstOrDefaultAsync(cancellationToken))?.OrganizationId 
                             ?? throw new KeyNotFoundException("User doesn't belong to any organization");

        var templateModel = new DAL.Entities.Template
        {
            Name = request.Name,
            Description = request.Description,
            Hardware = request.Hardware,
            ConnectionType = request.ConnectionType,
            OrganizationId = organizationId,
            CreatedBy = user.Id
        };
        
        _context.Templates.Add(templateModel);
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<TemplateDTO>(templateModel);
    }
}