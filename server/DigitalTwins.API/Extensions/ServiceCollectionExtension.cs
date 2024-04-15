using DigitalTwins.BLL.Interfaces;
using DigitalTwins.BLL.Services;
using DigitalTwins.Common.Options;
using DigitalTwins.DAL.Context;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.API.Extensions;

public static class ServiceCollectionExtension
{
    public static void AddDigitalTwinContext(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionsString = configuration.GetConnectionString("DigitalTwinDBConnection");
        services.AddDbContext<DigitalTwinContext>(options =>
            options.UseSqlServer(
                connectionsString,
                opt => opt.MigrationsAssembly(typeof(DigitalTwinContext).Assembly.GetName().Name)));
    }
    
    public static void RegisterCustomServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<MqttOptions>(configuration.GetSection(MqttOptions.SectionName));

        services.AddHostedService<MqttService>();
        services.AddSingleton<IMqttService, MqttService>();
        services.AddScoped<IDeviceService, DeviceService>();
    }
}