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
            sqlServerOptions => sqlServerOptions
                .MigrationsAssembly(typeof(DigitalTwinContext).Assembly.GetName().Name)
                .EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(10),
                    errorNumbersToAdd: null)
        ));
    }
    
    public static void RegisterCustomServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<MqttOptions>(configuration.GetSection(MqttOptions.SectionName));
        
        services.AddHostedService<MqttSubscriber>();
        services.AddSingleton<IMqttSubscriber, MqttSubscriber>();
        services.AddScoped<IMqttPublisher, MqttPublisher>();
        services.AddScoped<IDeviceService, DeviceService>();
    }
}