using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.Location;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Location;

public class GetLocationsListQuery : IRequest<IEnumerable<LocationDTO>>
{

}

public class GetLocationsListQueryHandler : IRequestHandler<GetLocationsListQuery, IEnumerable<LocationDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetLocationsListQueryHandler(DigitalTwinContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }
    
    public async Task<IEnumerable<LocationDTO>> Handle(GetLocationsListQuery request, CancellationToken cancellationToken)
    {
        var organizationId = await _currentUserService.GetCurrentOrganizationId();
        
        var locations = await _context.Locations.AsNoTracking()
            .Where(x => x.OrganizationId == organizationId)
            .Include(x => x.Users)
            .Include(x => x.Owner)
            .ToListAsync(cancellationToken);

        var responseModel = _mapper.Map<List<LocationDTO>>(locations);

        foreach (var model in responseModel)
        {
            var userIds = locations.FirstOrDefault(x => x.Id == model.Id)?.Users.Select(x => x.Id)
                ?? new List<long>();

            model.UsersIds = userIds;
        }
        
        return responseModel;
    }
}