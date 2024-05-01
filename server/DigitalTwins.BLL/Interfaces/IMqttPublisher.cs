using DigitalTwins.Common.DTOs.Mqtt;

namespace DigitalTwins.BLL.Interfaces;

public interface IMqttPublisher
{
    Task PublishAsync(MqttRequestDTO requestDto);
}