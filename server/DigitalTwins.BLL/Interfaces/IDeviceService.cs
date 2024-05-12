namespace DigitalTwins.BLL.Interfaces;

public interface IDeviceService
{
    Task HandleDeviceStatusesAsync(string json);
    Task HandleDeviceStatisticAsync(string json);
    Task HandleDeviceErrorLogAsync(string json);
}