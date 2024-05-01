using AutoMapper;
using DigitalTwins.Common.DTOs.Widget;
using DigitalTwins.Common.Enums;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;

namespace DigitalTwins.BLL.Commands.Widget;

public class CreateWidgetCommand : IRequest<WidgetDTO>
{
    public string Title { get; set; } = string.Empty;

    public WidgetType Type { get; set; }

    public long? DatastreamId { get; set; }
    
    public long TemplateId { get; set; }
}

public class CreateWidgetCommandValidator : AbstractValidator<CreateWidgetCommand>
{
    public CreateWidgetCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("Title cannot be empty")
            .MaximumLength(50)
            .WithMessage("Title cannot be longer then 50 symbols");
    }
}

public class CreateWidgetCommandHandler : IRequestHandler<CreateWidgetCommand, WidgetDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public CreateWidgetCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<WidgetDTO> Handle(CreateWidgetCommand request, CancellationToken cancellationToken)
    {
        var model = new DAL.Entities.Widget
        {
            Title = request.Title,
            Type = request.Type,
            TemplateId = request.TemplateId,
            DatastreamId = request.DatastreamId
        };

        _context.Widgets.Add(model);
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<WidgetDTO>(model);
    }
}