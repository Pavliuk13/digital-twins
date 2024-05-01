using AutoMapper;
using DigitalTwins.Common.DTOs.Widget;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Widget;

public class UpdateWidgetCommand : IRequest<WidgetDTO>
{
    public long WidgetId { get; set; }
    
    public string Title { get; set; } = string.Empty;

    public long? DatastreamId { get; set; }
}

public class UpdateWidgetCommandValidator : AbstractValidator<UpdateWidgetCommand>
{
    public UpdateWidgetCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("Title cannot be empty")
            .MaximumLength(50)
            .WithMessage("Title cannot be longer then 50 symbols");
    }
}

public class UpdateWidgetCommandHandler : IRequestHandler<UpdateWidgetCommand, WidgetDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public UpdateWidgetCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<WidgetDTO> Handle(UpdateWidgetCommand request, CancellationToken cancellationToken)
    {
        var widget = await _context.Widgets.FirstOrDefaultAsync(x => x.Id == request.WidgetId, cancellationToken)
                     ?? throw new KeyNotFoundException("Widget not found");

        widget.DatastreamId = request.DatastreamId;
        widget.Title = request.Title;

        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<WidgetDTO>(widget);
    }
}