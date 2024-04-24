using AutoMapper;
using DigitalTwins.Common.DTOs.Device;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Device;

public class GetDevicesByOrganizationQuery : IRequest<List<DeviceDTO>>
{
    public long OrganizationId { get; set; }
}

public class GetDevicesByOrganizationQueryHandler : IRequestHandler<GetDevicesByOrganizationQuery, List<DeviceDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public GetDevicesByOrganizationQueryHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<List<DeviceDTO>> Handle(GetDevicesByOrganizationQuery request, CancellationToken cancellationToken)
    {
        var devices = await _context.Devices.AsNoTracking()
            .Where(x => x.Template.OrganizationId == request.OrganizationId)
                .Include(x => x.Template)
                .Include(x => x.User)
            .ToListAsync(cancellationToken);
        
        return _mapper.Map<List<DeviceDTO>>(devices);
    }
}