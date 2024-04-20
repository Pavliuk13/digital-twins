namespace DigitalTwins.BLL.Interfaces;

public interface IDeviceService
{
    Task HandleDeviceStatuses(string json);
}