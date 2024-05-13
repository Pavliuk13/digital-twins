using DigitalTwins.Common.DTOs.User;

namespace DigitalTwins.BLL.Interfaces;

public interface ICurrentUserService
{
    Task<UserDTO> GetCurrentUser();
    
    Task<long> GetCurrentOrganizationId();

    Task<UserDTO> GetCurrentUserWithRole();
}