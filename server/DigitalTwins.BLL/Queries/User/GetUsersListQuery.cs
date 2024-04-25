using AutoMapper;
using DigitalTwins.Common.DTOs.User;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.User;

public class GetUsersListQuery : IRequest<IEnumerable<UserDTO>>
{
    public long OrganizationId { get; set; }
}

public class GetUsersListQueryHandler : IRequestHandler<GetUsersListQuery, IEnumerable<UserDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public GetUsersListQueryHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<UserDTO>> Handle(GetUsersListQuery request, CancellationToken cancellationToken)
    {
        var userIds = await _context.UserOrganizationRoles.AsNoTracking()
            .Where(x => x.OrganizationId == request.OrganizationId)
                .Select(x => x.UserId)
            .ToListAsync(cancellationToken);

        var users = await _context.Users.AsNoTracking()
            .Where(x => userIds.Contains(x.Id))
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<UserDTO>>(users);
    }
}