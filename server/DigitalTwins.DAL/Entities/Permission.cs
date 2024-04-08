namespace DigitalTwins.DAL.Entities;

public class Permission
{
    public long Id { get; set; }

    public string Key { get; set; } = string.Empty;
    
    public string Value { get; set; } = string.Empty;

    public IEnumerable<OrganizationPermissionRole> OrganizationPermissionRoles { get; set; } = null!;
}