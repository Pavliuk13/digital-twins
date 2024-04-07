using DigitalTwins.Common.Enums;

namespace DigitalTwins.DAL.Entities;

public sealed class Datastream
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Alias { get; set; } = string.Empty;

    public Pin Pin { get; set; }

    public PinMode PinMode { get; set; }

    public long TemplateId { get; set; }

    public Template Template { get; set; } = null!;
}