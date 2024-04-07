using DigitalTwins.Common.Enums;

namespace DigitalTwins.DAL.Entities;

public sealed class Template
{
    public long Id { get; set; }

    public Guid UGuid { get; set; }

    public string Name { get; set; } = string.Empty;

    public Hardware Hardware { get; set; }

    public ConnectionType ConnectionType { get; set; }

    public string Description { get; set; } = string.Empty;

    public long OrganizationId { get; set; }

    public long CreatedBy { get; set; }

    public Organization Organization { get; set; } = null!;

    public User User { get; set; } = null!;

    public IEnumerable<Datastream> Datastreams { get; set; } = null!;
    
    public IEnumerable<Device> Devices { get; set; } = null!;
}