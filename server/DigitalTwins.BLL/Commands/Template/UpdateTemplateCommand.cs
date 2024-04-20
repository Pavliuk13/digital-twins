using AutoMapper;
using DigitalTwins.Common.DTOs.Template;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Template;

public class UpdateTemplateCommand : IRequest<TemplateDTO>
{
    public long TemplateId { get; set; }
    
    public string Name { get; set; } = string.Empty;

    public string Hardware { get; set; } = string.Empty;

    public string ConnectionType { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
}

public class UpdateTemplateCommandValidator : AbstractValidator<UpdateTemplateCommand>
{
    public UpdateTemplateCommandValidator()
    {
        RuleFor(x => x.TemplateId)
            .NotNull()
            .WithMessage("Template Id can't be null");
        
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

public class UpdateTemplateCommandHandler : IRequestHandler<UpdateTemplateCommand, TemplateDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public UpdateTemplateCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<TemplateDTO> Handle(UpdateTemplateCommand request, CancellationToken cancellationToken)
    {
        var template = await _context.Templates.FirstOrDefaultAsync(x => x.Id == request.TemplateId, cancellationToken)
            ?? throw new KeyNotFoundException("Template was not found");

        template.Name = request.Name;
        template.Description = request.Description;
        template.ConnectionType = request.ConnectionType;
        template.Hardware = request.Hardware;

        _context.Update(template);
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<TemplateDTO>(template);
    }
}