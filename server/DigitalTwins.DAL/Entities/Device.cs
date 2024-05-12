using DigitalTwins.Common.Enums;

namespace DigitalTwins.DAL.Entities;

public class Device
{
    public long Id { get; set; }
    
    public Guid UGuid { get; set; }

    public long TemplateId { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string AzureDigitalTwinUrl { get; set; } = string.Empty;

    public long CreatedBy { get; set; }

    public Status Status { get; set; }

    public string TopicName { get; set; } = string.Empty;

    public Template Template { get; set; } = null!;

    public User User { get; set; } = null!;

    public IEnumerable<WidgetDevice> WidgetDevices { get; set; } = null!;
    
    public IEnumerable<Statistic> Statistics { get; set; } = null!;
    
    public IEnumerable<ErrorLog> ErrorLogs { get; set; } = null!;
}