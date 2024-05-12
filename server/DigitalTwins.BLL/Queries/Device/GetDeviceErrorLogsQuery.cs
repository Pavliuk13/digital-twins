using AutoMapper;
using DigitalTwins.Common.DTOs.Device;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Device;

public class GetDeviceErrorLogsQuery : IRequest<IEnumerable<ErrorLogDTO>>
{
    public long DeviceId { get; set; }
}

public class GetDeviceErrorLogsQueryHandler : IRequestHandler<GetDeviceErrorLogsQuery, IEnumerable<ErrorLogDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public GetDeviceErrorLogsQueryHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<ErrorLogDTO>> Handle(GetDeviceErrorLogsQuery request, CancellationToken cancellationToken)
    {
        var logs = await _context.ErrorLogs.AsNoTracking()
            .Where(x => x.DeviceId == request.DeviceId)
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<ErrorLogDTO>>(logs);
    }
}