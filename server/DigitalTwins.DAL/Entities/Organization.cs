namespace DigitalTwins.DAL.Entities;

public class Organization
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    
    public string LogoUrl { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public IEnumerable<Location> Locations { get; set; } = null!;

    public IEnumerable<Template> Templates { get; set; } = null!;
    
    public IEnumerable<UserOrganizationRole> UserOrganizationRoles { get; set; } = null!;
    
    public IEnumerable<OrganizationPermissionRole> OrganizationPermissionRoles { get; set; } = null!;
}