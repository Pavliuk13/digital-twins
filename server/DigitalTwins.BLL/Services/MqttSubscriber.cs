using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.Options;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MQTTnet;
using MQTTnet.Client;

namespace DigitalTwins.BLL.Services;

public class MqttSubscriber : IMqttSubscriber, IHostedService
{
    private readonly IMqttClient _mqttClient;
    private readonly IOptions<MqttOptions> _mqttOptions;
    private readonly IServiceScopeFactory _scopeFactory;
    
    public MqttSubscriber(IOptions<MqttOptions> mqttOptions, IServiceScopeFactory scopeFactory)
    {
        _mqttOptions = mqttOptions;
        _scopeFactory = scopeFactory;

        var factory = new MqttFactory();
        _mqttClient = factory.CreateMqttClient();
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await Connect();

        await SubscribeAsync("device/statuses");
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await _mqttClient.DisconnectAsync(cancellationToken: cancellationToken);
    }
    
    public async Task SubscribeAsync(string topic)
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