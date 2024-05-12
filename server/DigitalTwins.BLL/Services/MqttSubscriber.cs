using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.Constants;
using DigitalTwins.Common.Options;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MQTTnet;
using MQTTnet.Client;

namespace DigitalTwins.BLL.Services;

public class MqttSubscriber : IMqttSubscriber, IHostedService
{
    private readonly IMqttClient _mqttClient;
    private readonly IOptions<MqttOptions> _mqttOptions;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly Dictionary<string, Func<MqttApplicationMessageReceivedEventArgs, Task>> _handlers = new();
    
    public MqttSubscriber(IOptions<MqttOptions> mqttOptions, IServiceScopeFactory scopeFactory)
    {
        _mqttOptions = mqttOptions;
        _scopeFactory = scopeFactory;

        var factory = new MqttFactory();
        _mqttClient = factory.CreateMqttClient();
        _mqttClient.ApplicationMessageReceivedAsync += MessageReceivedHandlerAsync;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await Connect();

        await SubscribeAsync(MqttTopics.DeviceStatusTopic, HandleDeviceStatusAsync);
        await SubscribeAsync(MqttTopics.DeviceStatsTopic, HandleDeviceStatisticAsync);
        await SubscribeAsync(MqttTopics.DeviceErrorsTopic, HandleDeviceErrorLogAsync);
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await _mqttClient.DisconnectAsync(cancellationToken: cancellationToken);
    }
    
    public async Task SubscribeAsync(string topic, Func<MqttApplicationMessageReceivedEventArgs, Task> handler)
    {
        var subscribeOptions = new MqttClientSubscribeOptionsBuilder()
            .WithTopicFilter(topic)
            .Build();

        await _mqttClient.SubscribeAsync(subscribeOptions);
        _handlers[topic] = handler;
    }
    
    private async Task MessageReceivedHandlerAsync(MqttApplicationMessageReceivedEventArgs args)
    {
        var topic = args.ApplicationMessage.Topic;

        if (_handlers.TryGetValue(topic, out var handler))
        {
            await handler(args);
            return;
        }

        using var scope = _scopeFactory.CreateScope();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger>();
        logger.LogError($"Couldn't find handler for the topic '{topic}'");
    }

    private async Task HandleDeviceStatusAsync(MqttApplicationMessageReceivedEventArgs args)
    {
        using var scope = _scopeFactory.CreateScope();
        var deviceService = scope.ServiceProvider.GetRequiredService<IDeviceService>();
        await deviceService.HandleDeviceStatusesAsync(args.ApplicationMessage.ConvertPayloadToString());
    }
    
    private async Task HandleDeviceStatisticAsync(MqttApplicationMessageReceivedEventArgs args)
    {
        using var scope = _scopeFactory.CreateScope();
        var deviceService = scope.ServiceProvider.GetRequiredService<IDeviceService>();
        await deviceService.HandleDeviceStatisticAsync(args.ApplicationMessage.ConvertPayloadToString());
    }
    
    private async Task HandleDeviceErrorLogAsync(MqttApplicationMessageReceivedEventArgs args)
    {
        using var scope = _scopeFactory.CreateScope();
        var deviceService = scope.ServiceProvider.GetRequiredService<IDeviceService>();
        await deviceService.HandleDeviceErrorLogAsync(args.ApplicationMessage.ConvertPayloadToString());
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