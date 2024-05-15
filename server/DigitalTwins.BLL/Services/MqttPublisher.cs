using System.Text;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.Options;
using DigitalTwins.DAL.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MQTTnet;
using MQTTnet.Client;
using System.Text.Json;
using DigitalTwins.Common.DTOs.Mqtt;
using DigitalTwins.DAL.Entities;

namespace DigitalTwins.BLL.Services;

public class MqttPublisher : IMqttPublisher
{
    private readonly IMqttClient _mqttClient;
    private readonly IOptions<MqttOptions> _mqttOptions;
    private readonly DigitalTwinContext _context;
    
    public MqttPublisher(IOptions<MqttOptions> mqttOptions, DigitalTwinContext context)
    {
        _mqttOptions = mqttOptions;
        _context = context;

        var factory = new MqttFactory();
        _mqttClient = factory.CreateMqttClient();
    }
    
    public async Task PublishAsync(MqttRequestDTO requestDto)
    {
        if (!_mqttClient.IsConnected)
        {
            await Connect();
        }
        
        var device = await _context.Devices.AsNoTracking().FirstOrDefaultAsync(x => x.Id == requestDto.DeviceId)
            ?? throw new KeyNotFoundException("Device doesn't exist");
        
        var widget = await _context.Widgets.AsNoTracking()
            .Include(x => x.Datastream)
                .FirstOrDefaultAsync(x => x.Id == requestDto.WidgetId)
            ?? throw new KeyNotFoundException("Widget doesn't exist");
        
        var response = new MqttResponseDTO
        {
            Pin = (int)widget.Datastream.Pin,
            Value = requestDto.Value
        };
        
        var messageJson = JsonSerializer.Serialize(response);
        
        var payload = Encoding.UTF8.GetBytes(messageJson);
        var mqttMessage = new MqttApplicationMessageBuilder()
            .WithTopic(device.TopicName)
            .WithPayload(payload)
            .Build();

        await _mqttClient.PublishAsync(mqttMessage);

        await SaveWidgetState(requestDto);
    }

    private async Task SaveWidgetState(MqttRequestDTO requestDto)
    {
        var widgetDevice = await _context.WidgetDevices
            .FirstOrDefaultAsync(x => x.WidgetId == requestDto.WidgetId && x.DeviceId == requestDto.DeviceId);

        if (widgetDevice is not null)
        {
            widgetDevice.Value = requestDto.Value;
        }
        else
        {
            var newWidgetDevice = new WidgetDevice
            {
                DeviceId = requestDto.DeviceId,
                WidgetId = requestDto.WidgetId,
                Value = requestDto.Value
            };

            _context.WidgetDevices.Add(newWidgetDevice);
        }
        
        await _context.SaveChangesAsync();
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