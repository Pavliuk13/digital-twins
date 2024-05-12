using MQTTnet.Client;

namespace DigitalTwins.BLL.Interfaces;

public interface IMqttSubscriber
{
    Task SubscribeAsync(string topic, Func<MqttApplicationMessageReceivedEventArgs, Task> handler);
}