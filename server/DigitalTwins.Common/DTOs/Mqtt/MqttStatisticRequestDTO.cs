namespace DigitalTwins.Common.DTOs.Mqtt;

public class MqttStatisticRequestDTO
{
    public int LightSwitchCount { get; set; }
    
    public double Uptime { get; set; }

    public double HeapUsage { get; set; }

    public int Rssi { get; set; }

    public Guid Id { get; set; }
}