using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.Device;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Device;

public class GetDevicesByOrganizationQuery : IRequest<IEnumerable<DeviceDTO>>
{
    
}

public class GetDevicesByOrganizationQueryHandler : IRequestHandler<GetDevicesByOrganizationQuery, IEnumerable<DeviceDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetDevicesByOrganizationQueryHandler(DigitalTwinContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }
    
    public async Task<IEnumerable<DeviceDTO>> Handle(GetDevicesByOrganizationQuery request, CancellationToken cancellationToken)
    {
        var organizationId = await _currentUserService.GetCurrentOrganizationId();
        
        var devices = await _context.Devices.AsNoTracking()
            .Where(x => x.Template.OrganizationId == organizationId)
                .Include(x => x.Template)
                .Include(x => x.User)
            .ToListAsync(cancellationToken);
        
        return _mapper.Map<IEnumerable<DeviceDTO>>(devices);
    }
}