using DigitalTwins.Common.Enums;

namespace DigitalTwins.Common.DTOs.Device;

public class DeviceDTO
{
    public long Id { get; set; }
    
    public Guid UGuid { get; set; }

    public long TemplateId { get; set; }

    public string Name { get; set; } = string.Empty;

    public long CreatedBy { get; set; }

    public Status Status { get; set; }
}