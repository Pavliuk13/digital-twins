namespace DigitalTwins.Common.DTOs.Mqtt;

public class MqttRequestDTO
{
    public long DeviceId { get; set; }
    
    public long WidgetId { get; set; }

    public bool Value { get; set; }
}