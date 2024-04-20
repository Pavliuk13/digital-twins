using DigitalTwins.Common.DTOs.Datastream;
using DigitalTwins.Common.DTOs.Device;

namespace DigitalTwins.Common.DTOs.Template;

public class TemplateDTO
{
    public long Id { get; set; }

    public Guid UGuid { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Hardware { get; set; } = string.Empty;

    public string ConnectionType { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public long OrganizationId { get; set; }

    public long CreatedBy { get; set; }
    
    public IEnumerable<DatastreamDTO> Datastreams { get; set; } = null!;
    
    public IEnumerable<DeviceDTO> Devices { get; set; } = null!;
}