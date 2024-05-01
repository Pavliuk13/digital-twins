using DigitalTwins.Common.DTOs.User;

namespace DigitalTwins.BLL.Interfaces;

public interface ICurrentUserService
{
    Task<string> GetCurrentUserEmail();
    Task<UserDTO> GetCurrentUser();
    
    Task<long> GetCurrentOrganizationId();
}