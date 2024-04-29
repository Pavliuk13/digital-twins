using AutoMapper;
using DigitalTwins.Common.DTOs.Datastream;
using DigitalTwins.Common.Enums;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;

namespace DigitalTwins.BLL.Commands.Datastream;

public class CreateDatastreamCommand : IRequest<DatastreamDTO>
{
    public string Name { get; set; } = string.Empty;

    public string Alias { get; set; } = string.Empty;

    public Pin Pin { get; set; }

    public PinMode PinMode { get; set; }

    public long TemplateId { get; set; }
}

public class CreateDatastreamCommandValidator : AbstractValidator<CreateDatastreamCommand>
{
    public CreateDatastreamCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Datastream name can't be empty")
            .MaximumLength(100)
            .WithMessage("Datastream name can't be more than 100 symbols");
        
        RuleFor(x => x.Alias)
            .NotEmpty()
            .WithMessage("Datastream alias can't be empty")
            .MaximumLength(100)
            .WithMessage("Datastream alias can't be more than 100 symbols");
        
        RuleFor(x => x.Pin)
            .IsInEnum();
        
        RuleFor(x => x.PinMode)
            .IsInEnum();
        
        RuleFor(x => x.TemplateId)
            .NotNull()
            .WithMessage("Template Id can't be null");
    }
}

public class CreateDatastreamCommandHandler : IRequestHandler<CreateDatastreamCommand, DatastreamDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public CreateDatastreamCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<DatastreamDTO> Handle(CreateDatastreamCommand request, CancellationToken cancellationToken)
    {
        var datastreamModel = new DAL.Entities.Datastream
        {
            Name = request.Name,
            Alias = request.Alias,
            PinMode = request.PinMode,
            Pin = request.Pin,
            TemplateId = request.TemplateId
        };
        
        _context.Datastreams.Add(datastreamModel);
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<DatastreamDTO>(datastreamModel);
    }
}