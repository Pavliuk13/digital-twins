namespace DigitalTwins.DAL.Entities;

public class Template
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Hardware { get; set; } = string.Empty;

    public string ConnectionType { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public long OrganizationId { get; set; }

    public long CreatedBy { get; set; }

    public Organization Organization { get; set; } = null!;

    public User User { get; set; } = null!;

    public IEnumerable<Datastream> Datastreams { get; set; } = null!;
    
    public IEnumerable<Device> Devices { get; set; } = null!;
}