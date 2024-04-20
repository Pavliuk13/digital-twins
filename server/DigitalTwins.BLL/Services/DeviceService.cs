using System.Text.Json;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs;
using DigitalTwins.DAL.Context;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Services;

public class DeviceService : IDeviceService
{
    private readonly DigitalTwinContext _context;

    public DeviceService(DigitalTwinContext context)
    {
        _context = context;
    }

    public async Task HandleDeviceStatuses(string json)
    {
        try
        {
            var model = JsonSerializer.Deserialize<DeviceStatusRequestDTO>(json);

            ArgumentNullException.ThrowIfNull(model);
            
            await UpdateStatuses(model);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }
    
    private async Task UpdateStatuses(DeviceStatusRequestDTO requestDto)
    {
        var device = await _context.Devices
            .FirstOrDefaultAsync(x => x.UGuid == requestDto.Id);

        if (device is null)
        {
            return;
        }
        
        device.Status = requestDto.Status;

        _context.Update(device);
        await _context.SaveChangesAsync();
    }
}