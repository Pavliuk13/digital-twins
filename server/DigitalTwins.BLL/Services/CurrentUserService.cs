using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.User;
using DigitalTwins.DAL.Context;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _accessor;
    private readonly FirebaseAuth _firebaseAuth;
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public CurrentUserService(
        IHttpContextAccessor  accessor, 
        FirebaseAuth firebaseAuth, 
        DigitalTwinContext context,
        IMapper mapper
        )
    {
        _accessor = accessor;
        _firebaseAuth = firebaseAuth;
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<UserDTO> GetCurrentUser()
    {
        var email = await GetCurrentUserEmail();

        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Email == email)
            ?? throw new KeyNotFoundException("User not found");

        return _mapper.Map<UserDTO>(user);
    }

    public async Task<long> GetCurrentOrganizationId()
    {
        var user = await GetCurrentUser();

        var userOrganization = await _context.UserOrganizationRoles
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == user.Id)
            ?? throw new KeyNotFoundException("User doesn't belong to any organization");

        return userOrganization.OrganizationId;
    }

    private async Task<string> GetCurrentUserEmail()
    {
        var userId = GetFirebaseUserId();
        var user = await _firebaseAuth.GetUserAsync(userId);
        
        return user.Email;
    }

    private string GetFirebaseUserId()
    {
        var userId = _accessor.HttpContext?.User.Claims
            .FirstOrDefault(claim => claim.Type == "user_id")?
            .Value;

        return userId ?? string.Empty;
    }
}