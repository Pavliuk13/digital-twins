namespace DigitalTwins.DAL.Entities;

public class OrganizationPermissionRole
{
    public long OrganizationId { get; set; }
    
    public long PermissionId { get; set; }

    public long RoleId { get; set; }

    public Organization Organization { get; set; } = null!;
    
    public Permission Permission { get; set; } = null!;
    
    public Role Role { get; set; } = null!;
}