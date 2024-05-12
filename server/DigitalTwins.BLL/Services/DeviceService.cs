using System.Text.Json;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs;
using DigitalTwins.Common.DTOs.Mqtt;
using DigitalTwins.DAL.Context;
using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DigitalTwins.BLL.Services;

public class DeviceService : IDeviceService
{
    private readonly DigitalTwinContext _context;
    private readonly ILogger _logger;

    public DeviceService(DigitalTwinContext context, ILogger<DeviceService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task HandleDeviceStatusesAsync(string json)
    {
        try
        {
            var model = JsonSerializer.Deserialize<DeviceStatusRequestDTO>(json);

            ArgumentNullException.ThrowIfNull(model);
            
            await UpdateStatuses(model);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Couldn't handle device status. JSON: {json}");
        }
    }

    public async Task HandleDeviceStatisticAsync(string json)
    {
        try
        {
            var model = JsonSerializer.Deserialize<MqttStatisticRequestDTO>(json);

            ArgumentNullException.ThrowIfNull(model);
            
            await AddStatisticToDatabase(model);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Couldn't handle device statistic. JSON: {json}");
        }
    }

    public async Task HandleDeviceErrorLogAsync(string json)
    {
        try
        {
            var model = JsonSerializer.Deserialize<MqttErrorLogRequestDTO>(json);

            ArgumentNullException.ThrowIfNull(model);
            
            await AddErrorLogToDatabase(model);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Couldn't handle device error log. JSON: {json}");
        }
    }

    private async Task UpdateStatuses(DeviceStatusRequestDTO requestDto)
    {
        var device = await _context.Devices
            .FirstOrDefaultAsync(x => x.UGuid == requestDto.Id);

        if (device is null)
        {
            _logger.LogError($"Received status update for not existing device: {requestDto.Id}");
            return;
        }
        
        device.Status = requestDto.Status;

        _context.Update(device);
        await _context.SaveChangesAsync();
    }
    
    private async Task AddStatisticToDatabase(MqttStatisticRequestDTO model)
    {
        var device = await _context.Devices.AsNoTracking()
            .FirstOrDefaultAsync(x => x.UGuid == model.Id);

        if (device is null)
        {
            _logger.LogError($"Received statistic for not existing device: {model.Id}");
            return;
        }

        var statistic = new Statistic
        {
            DeviceId = device.Id,
            HeapUsage = model.HeapUsage,
            Rssi = model.Rssi,
            Uptime = model.Uptime,
            StatsTime = DateTime.Now,
            LightSwitchCount = model.LightSwitchCount
        };

        _context.Statistics.Add(statistic);
        await _context.SaveChangesAsync();
    }
    
    private async Task AddErrorLogToDatabase(MqttErrorLogRequestDTO model)
    {
        var device = await _context.Devices.AsNoTracking()
            .FirstOrDefaultAsync(x => x.UGuid == model.Id);

        if (device is null)
        {
            _logger.LogError($"Received error log for not existing device: {model.Id}");
            return;
        }

        var errorLog = new ErrorLog
        {
            DeviceId = device.Id,
            Name = model.Name,
            Description = model.Description,
            DateTime = DateTime.Now
        };

        _context.ErrorLogs.Add(errorLog);
        await _context.SaveChangesAsync();
    }
}