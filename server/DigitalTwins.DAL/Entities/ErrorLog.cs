namespace DigitalTwins.DAL.Entities;

public class ErrorLog
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime DateTime { get; set; }

    public long DeviceId { get; set; }

    public Device Device { get; set; } = null!;
}