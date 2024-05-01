using DigitalTwins.Common.Enums;

namespace DigitalTwins.Common.DTOs.Widget;

public class WidgetDTO
{
    public long Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public WidgetType Type { get; set; }

    public long? DatastreamId { get; set; }
    
    public long TemplateId { get; set; }

    public bool Value { get; set; }
}