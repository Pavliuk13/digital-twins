namespace DigitalTwins.DAL.Entities;

public class Role
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public IEnumerable<UserOrganizationRole> UserOrganizationRoles { get; set; } = null!;

    public IEnumerable<OrganizationPermissionRole> OrganizationPermissionRoles { get; set; } = null!;
}