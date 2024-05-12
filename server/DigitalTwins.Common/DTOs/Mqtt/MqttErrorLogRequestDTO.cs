namespace DigitalTwins.Common.DTOs.Mqtt;

public class MqttErrorLogRequestDTO
{
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public Guid Id { get; set; }
}