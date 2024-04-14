namespace DigitalTwins.Common.DTOs;

public class MqttRequestDTO
{
    public string BoardName { get; set; } = string.Empty;

    public int Pin { get; set; }

    public bool Value { get; set; }

    public Guid Guid { get; set; }
}