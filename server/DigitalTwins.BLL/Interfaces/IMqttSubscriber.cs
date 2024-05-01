namespace DigitalTwins.BLL.Interfaces;

public interface IMqttSubscriber
{
    Task SubscribeAsync(string topic);
}