using DigitalTwins.Common.Enums;

namespace DigitalTwins.DAL.Entities;

public class Widget
{
    public long Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public WidgetType Type { get; set; }

    public long? DatastreamId { get; set; }
    
    public long TemplateId { get; set; }

    public Datastream Datastream { get; set; } = null!;

    public Template Template { get; set; } = null!;
    
    public IEnumerable<WidgetDevice> WidgetDevices { get; set; } = null!;
}