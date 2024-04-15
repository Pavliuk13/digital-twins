using DigitalTwins.Common.Enums;

namespace DigitalTwins.Common.DTOs;

public class DeviceStatusRequestDTO
{
    public Guid Id { get; set; }
    
    public Status Status { get; set; }
}