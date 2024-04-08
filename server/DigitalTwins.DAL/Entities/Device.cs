using DigitalTwins.Common.Enums;

namespace DigitalTwins.DAL.Entities;

public class Device
{
    public long Id { get; set; }

    public long TemplateId { get; set; }

    public string Name { get; set; } = string.Empty;

    public long CreatedBy { get; set; }

    public Status Status { get; set; }

    public Template Template { get; set; } = null!;

    public User User { get; set; } = null!;
}