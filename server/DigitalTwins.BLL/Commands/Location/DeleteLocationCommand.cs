using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Location;

public class DeleteLocationCommand : IRequest
{
    public long LocationId { get; set; }
}

public class DeleteLocationCommandHandler : IRequestHandler<DeleteLocationCommand>
{
    private readonly DigitalTwinContext _context;

    public DeleteLocationCommandHandler(DigitalTwinContext context)
    {
        _context = context;
    }
    
    public async Task Handle(DeleteLocationCommand request, CancellationToken cancellationToken)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        
        var location = await _context.Locations.FirstOrDefaultAsync(x => x.Id == request.LocationId, cancellationToken)
                       ?? throw new KeyNotFoundException("Location was not found");

        _context.Locations.Remove(location);
        await _context.SaveChangesAsync(cancellationToken);
        
        await transaction.CommitAsync(cancellationToken);
    }
}