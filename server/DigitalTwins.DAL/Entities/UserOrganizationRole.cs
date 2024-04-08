namespace DigitalTwins.DAL.Entities;

public class UserOrganizationRole
{
    public long UserId { get; set; }

    public long OrganizationId { get; set; }

    public long RoleId { get; set; }

    public User User { get; set; } = null!;
    
    public Organization Organization { get; set; } = null!;
    
    public Role Role { get; set; } = null!;
}