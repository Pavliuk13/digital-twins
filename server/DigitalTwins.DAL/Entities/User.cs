using DigitalTwins.Common.Enums;

namespace DigitalTwins.DAL.Entities;

public class User
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public UserStatus Status { get; set; }

    public DateTime? LastLoginAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public string? InvitationCode { get; set; }

    public IEnumerable<Template> Templates { get; set; } = null!;
    
    public IEnumerable<Device> Devices { get; set; } = null!;
    
    public IEnumerable<Location> Locations { get; set; } = null!;
    
    public IEnumerable<UserOrganizationRole> UserOrganizationRoles { get; set; } = null!;
}