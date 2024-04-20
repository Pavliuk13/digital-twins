using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Device;

public class DeleteDeviceCommand : IRequest
{
    public long DeviceId { get; set; }
}

public class DeleteDeviceCommandHandler : IRequestHandler<DeleteDeviceCommand>
{
    private readonly DigitalTwinContext _context;

    public DeleteDeviceCommandHandler(DigitalTwinContext context)
    {
        _context = context;
    }
    
    public async Task Handle(DeleteDeviceCommand request, CancellationToken cancellationToken)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        
        var device = await _context.Devices.FirstOrDefaultAsync(x => x.Id == request.DeviceId, cancellationToken)
                       ?? throw new KeyNotFoundException("Device not found");

        _context.Devices.Remove(device);
        await _context.SaveChangesAsync(cancellationToken);
        
        await transaction.CommitAsync(cancellationToken);
    }
}