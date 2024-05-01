using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Widget;

public class DeleteWidgetCommand : IRequest
{
    public long WidgetId { get; set; }
}

public class DeleteWidgetCommandHandler : IRequestHandler<DeleteWidgetCommand>
{
    private readonly DigitalTwinContext _context;

    public DeleteWidgetCommandHandler(DigitalTwinContext context)
    {
        _context = context;
    }
    
    public async Task Handle(DeleteWidgetCommand request, CancellationToken cancellationToken)
    {
        var widget = await _context.Widgets.FirstOrDefaultAsync(x => x.Id == request.WidgetId, cancellationToken)
                     ?? throw new KeyNotFoundException("Widget not found");

        _context.Widgets.Remove(widget);
        await _context.SaveChangesAsync(cancellationToken);
    }
}