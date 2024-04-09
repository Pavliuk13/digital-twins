using DigitalTwins.Common.DTOs;

namespace DigitalTwins.BLL.Interfaces;

public interface IMqttService
{
    Task PublishAsync(MqttRequestDTO requestDto);
}