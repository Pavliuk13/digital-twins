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
}