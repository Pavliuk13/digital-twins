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
        var template = await _context.Templates
            .Include(x => x.Devices)
            .FirstOrDefaultAsync(x => x.UGuid == requestDto.Id);

        if (template is null)
        {
            return;
        }

        foreach (var device in template.Devices)
        {
            device.Status = requestDto.Status;
        }

        _context.Update(template);
        await _context.SaveChangesAsync();
    }
}