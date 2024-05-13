namespace DigitalTwins.Common.DTOs.Device;

public class StatisticDTO
{
    public long Id { get; set; }
    
    public int LightSwitchCount { get; set; }

    public DateTime StatsTime { get; set; }

    public double Uptime { get; set; }

    public double HeapUsage { get; set; }

    public int Rssi { get; set; }

    public long DeviceId { get; set; }
}