using AutoMapper;
using DigitalTwins.Common.DTOs.Device;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Device;

public class GetDeviceStatisticsQuery : IRequest<IEnumerable<StatisticDTO>>
{
    public long DeviceId { get; set; }
}

public class GetDeviceStatisticsQueryHandler : IRequestHandler<GetDeviceStatisticsQuery, IEnumerable<StatisticDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public GetDeviceStatisticsQueryHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<StatisticDTO>> Handle(GetDeviceStatisticsQuery request, CancellationToken cancellationToken)
    {
        var stats = await _context.Statistics.AsNoTracking()
            .Where(x => x.DeviceId == request.DeviceId)
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<StatisticDTO>>(stats);
    }
}