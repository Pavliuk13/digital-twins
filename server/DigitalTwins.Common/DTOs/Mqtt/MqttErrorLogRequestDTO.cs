namespace DigitalTwins.Common.DTOs.Mqtt;

public class MqttErrorLogRequestDTO
{
    public string Error { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public Guid Id { get; set; }
}