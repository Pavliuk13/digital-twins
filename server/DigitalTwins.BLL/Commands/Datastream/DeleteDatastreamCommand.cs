using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Datastream;

public class DeleteDatastreamCommand : IRequest
{
    public long DatastreamId { get; set; }
}

public class DeleteDatastreamCommandHandler : IRequestHandler<DeleteDatastreamCommand>
{
    private readonly DigitalTwinContext _context;

    public DeleteDatastreamCommandHandler(DigitalTwinContext context)
    {
        _context = context;
    }
    
    public async Task Handle(DeleteDatastreamCommand request, CancellationToken cancellationToken)
    {
        var datastream = await _context.Datastreams.FirstOrDefaultAsync(x => x.Id == request.DatastreamId, cancellationToken)
                       ?? throw new KeyNotFoundException("Datastream was not found");

        _context.Datastreams.Remove(datastream);
        await _context.SaveChangesAsync(cancellationToken);
    }
}