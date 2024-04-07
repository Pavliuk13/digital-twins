namespace DigitalTwins.DAL.Entities;

public sealed class Permission
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public IEnumerable<Role> Roles { get; set; } = null!;
}