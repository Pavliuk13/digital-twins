using DigitalTwins.Common.Enums;

namespace DigitalTwins.Common.DTOs.Datastream;

public class DatastreamDTO
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Alias { get; set; } = string.Empty;

    public Pin Pin { get; set; }

    public PinMode PinMode { get; set; }

    public long TemplateId { get; set; }

}