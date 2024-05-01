using DigitalTwins.Common.DTOs.Template;
using DigitalTwins.Common.DTOs.User;
using DigitalTwins.Common.DTOs.Widget;
using DigitalTwins.Common.Enums;

namespace DigitalTwins.Common.DTOs.Device;

public class DeviceDTO
{
    public long Id { get; set; }
    
    public Guid UGuid { get; set; }

    public long TemplateId { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string TopicName { get; set; } = string.Empty;

    public long CreatedBy { get; set; }

    public Status Status { get; set; }

    public TemplateDTO Template { get; set; } = null!;
    
    public UserDTO User { get; set; } = null!;
}