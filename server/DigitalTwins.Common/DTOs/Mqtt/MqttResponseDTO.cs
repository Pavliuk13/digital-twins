namespace DigitalTwins.Common.DTOs.Mqtt;

public class MqttResponseDTO
{
    public int Pin { get; set; }

    public bool Value { get; set; }
    
    public Guid Guid { get; set; }
}