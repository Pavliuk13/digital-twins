using System.Text;
using System.Text.Json;
using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs;
using DigitalTwins.Common.Options;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MQTTnet;
using MQTTnet.Client;

namespace DigitalTwins.BLL.Services;

public class MqttService : IMqttService, IHostedService
{
    private readonly IMqttClient _mqttClient;
    private readonly IOptions<MqttOptions> _mqttOptions;
    private readonly IMapper _mapper;
    private readonly IServiceScopeFactory _scopeFactory;

    private const string LightTopicTemplate = "{0}/{1}/light";
    
    public MqttService(IOptions<MqttOptions> mqttOptions, IMapper mapper, IServiceScopeFactory scopeFactory)
    {
        _mqttOptions = mqttOptions;
        _mapper = mapper;
        _scopeFactory = scopeFactory;

        var factory = new MqttFactory();
        _mqttClient = factory.CreateMqttClient();
    }

    public async Task PublishAsync(MqttRequestDTO requestDto)
    {
        if (!_mqttClient.IsConnected)
        {
            await Connect();
        }
        
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

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await Connect();

        await SubscribeToSpecificTopic("device/statuses");
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await _mqttClient.DisconnectAsync(cancellationToken: cancellationToken);
    }
    
    private async Task SubscribeToSpecificTopic(string topic)
    {
        var subscribeOptions = new MqttClientSubscribeOptionsBuilder()
            .WithTopicFilter(topic)
            .Build();

        await _mqttClient.SubscribeAsync(subscribeOptions);
        
        _mqttClient.ApplicationMessageReceivedAsync += async args =>
        {
            using var scope = _scopeFactory.CreateScope();
            var deviceService = scope.ServiceProvider.GetRequiredService<IDeviceService>();
            await deviceService.HandleDeviceStatuses(args.ApplicationMessage.ConvertPayloadToString());
        };
    }
    
    private async Task Connect()
    {
        var options = new MqttClientOptionsBuilder()
            .WithTcpServer(_mqttOptions.Value.ServerAddress, _mqttOptions.Value.Port)
            .WithCredentials(_mqttOptions.Value.Username, _mqttOptions.Value.Password)
            .Build();
        
        await _mqttClient.ConnectAsync(options);
    }
}