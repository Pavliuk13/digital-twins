using AutoMapper;
using DigitalTwins.Common.DTOs.Location;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Location;

public class GetLocationsListQuery : IRequest<IEnumerable<LocationDTO>>
{
    public long OrganizationId { get; set; }
}

public class GetLocationsListQueryHandler : IRequestHandler<GetLocationsListQuery, IEnumerable<LocationDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public GetLocationsListQueryHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<LocationDTO>> Handle(GetLocationsListQuery request, CancellationToken cancellationToken)
    {
        var locations = await _context.Locations.AsNoTracking()
            .Where(x => x.OrganizationId == request.OrganizationId)
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