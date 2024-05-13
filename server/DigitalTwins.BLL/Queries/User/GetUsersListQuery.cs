using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.User;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.User;

public class GetUsersListQuery : IRequest<IEnumerable<UserDTO>>
{
    
}

public class GetUsersListQueryHandler : IRequestHandler<GetUsersListQuery, IEnumerable<UserDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetUsersListQueryHandler(DigitalTwinContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }
    
    public async Task<IEnumerable<UserDTO>> Handle(GetUsersListQuery request, CancellationToken cancellationToken)
    {
        var organizationId = await _currentUserService.GetCurrentOrganizationId();
        
        var usersWithRoles = await _context.Users
            .AsNoTracking()
            .Where(u => _context.UserOrganizationRoles.Any(ur => ur.UserId == u.Id 
                                                                 && ur.OrganizationId == organizationId))
            .Select(u => new 
            {
                User = u,
                RoleName = _context.UserOrganizationRoles
                    .Where(ur => ur.UserId == u.Id && ur.OrganizationId == organizationId)
                    .Select(ur => ur.Role.Name)
                    .FirstOrDefault()
            })
            .ToListAsync(cancellationToken);
        
        var userDtos = usersWithRoles.Select(x => 
        {
            var userDto = _mapper.Map<UserDTO>(x.User);
            userDto.Role = x.RoleName ?? string.Empty;
            return userDto;
        });

        return userDtos;
    }
}