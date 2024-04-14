using System.Text;
using System.Text.Json;
using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs;
using DigitalTwins.Common.Options;
using Microsoft.Extensions.Options;
using MQTTnet;
using MQTTnet.Client;

namespace DigitalTwins.BLL.Services;

public class MqttService : IMqttService
{
    private readonly IMqttClient _mqttClient;
    private readonly IOptions<MqttOptions> _mqttOptions;
    private readonly IMapper _mapper;

    private const string LightTopicTemplate = "{0}/{1}/light";
    
    public MqttService(IOptions<MqttOptions> mqttOptions, IMapper mapper)
    {
        _mqttOptions = mqttOptions;
        _mapper = mapper;

        var factory = new MqttFactory();
        _mqttClient = factory.CreateMqttClient();
        
        var options = new MqttClientOptionsBuilder()
            .WithTcpServer(mqttOptions.Value.ServerAddress, mqttOptions.Value.Port)
            .Build();

        _mqttClient.ConnectAsync(options).GetAwaiter().GetResult();
    }
    
    public async Task PublishAsync(MqttRequestDTO requestDto)
    {
        var topic = string.Format(LightTopicTemplate, requestDto.BoardName, requestDto.Guid);
        var response = _mapper.Map<MqttResponseDTO>(requestDto);
        
        var messageJson = JsonSerializer.Serialize(response);
        
        var payload = Encoding.UTF8.GetBytes(messageJson);
        var mqttMessage = new MqttApplicationMessageBuilder()
            .WithTopic(topic)
            .WithPayload(payload)
            .Build();
        
        await _mqttClient.PublishAsync(mqttMessage);
    }
}