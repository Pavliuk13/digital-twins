using AutoMapper;
using DigitalTwins.Common.DTOs.Location;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Location;

public class UpdateUsersInLocationCommand : IRequest<LocationDTO>
{
    public long LocationId { get; set; }
    
    public IEnumerable<long> IncludedUsersIds { get; set; } = null!;
}

public class UpdateUsersInLocationCommandHandler : IRequestHandler<UpdateUsersInLocationCommand, LocationDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public UpdateUsersInLocationCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<LocationDTO> Handle(UpdateUsersInLocationCommand request, CancellationToken cancellationToken)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        
        var location = await _context.Locations
                           .Include(x => x.Owner)
                           .FirstOrDefaultAsync(x => x.Id == request.LocationId, cancellationToken)
                       ?? throw new KeyNotFoundException("Location wasn't found");
     
        var existingUserIds = await _context.UserLocations.AsNoTracking()
            .Where(x => x.LocationId == request.LocationId)
            .Select(x => x.UserId)
            .ToListAsync(cancellationToken);

        var usersToAdd = request.IncludedUsersIds.Except(existingUserIds);
        var usersToRemove = existingUserIds.Except(request.IncludedUsersIds);
        
        var usersToAddList = await _context.Users
            .Where(x => usersToAdd.Contains(x.Id))
            .ToListAsync(cancellationToken);
        
        var usersLocationToDelete = await _context.UserLocations
            .Where(x => x.LocationId == request.LocationId && usersToRemove.Contains(x.UserId))
            .ToListAsync(cancellationToken);
        
        location.Users = usersToAddList;
        
        _context.UserLocations.RemoveRange(usersLocationToDelete);
        await _context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync(cancellationToken);

        var responseModel = _mapper.Map<LocationDTO>(location);
        responseModel.UsersIds = request.IncludedUsersIds;

        return responseModel;
    }
}