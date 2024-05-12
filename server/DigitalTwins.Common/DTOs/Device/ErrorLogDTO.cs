namespace DigitalTwins.Common.DTOs.Device;

public class ErrorLogDTO
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime DateTime { get; set; }

    public long DeviceId { get; set; }
}