using AutoMapper;
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

    public long UserId { get; set; }
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
        
        RuleFor(x => x.UserId)
            .NotNull()
            .WithMessage("User Id can't be null");
    }
}

public class CreateTemplateCommandHandler : IRequestHandler<CreateTemplateCommand, TemplateDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public CreateTemplateCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<TemplateDTO> Handle(CreateTemplateCommand request, CancellationToken cancellationToken)
    {
        var organizationId = (await _context.Users.AsNoTracking().Where(x => x.Id == request.UserId)
                            .Include(x => x.UserOrganizationRoles)
                            .Select(x => x.UserOrganizationRoles.FirstOrDefault())
                            .FirstOrDefaultAsync(cancellationToken))?.OrganizationId 
                             ?? throw new KeyNotFoundException("User doesn't belong to any organization");

        var templateModel = new DAL.Entities.Template
        {
            UGuid = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            Hardware = request.Hardware,
            ConnectionType = request.ConnectionType,
            OrganizationId = organizationId,
            CreatedBy = request.UserId
        };

        _context.Templates.Add(templateModel);
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<TemplateDTO>(templateModel);
    }
}