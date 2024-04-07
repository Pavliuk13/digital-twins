namespace DigitalTwins.DAL.Entities;

public sealed class Role
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public IEnumerable<User> Users { get; set; } = null!;

    public IEnumerable<Permission> Permissions { get; set; } = null!;

    public IEnumerable<Organization> Organizations { get; set; } = null!;
}