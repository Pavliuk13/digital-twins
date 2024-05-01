namespace DigitalTwins.DAL.Entities;

public class WidgetDevice
{
    public long WidgetId { get; set; }
    
    public long DeviceId { get; set; }

    public bool Value { get; set; }

    public Device Device { get; set; } = null!;
    
    public Widget Widget { get; set; } = null!;
}