using DigitalTwins.DAL.Context;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.API.Extensions;

public static class ApplicationBuilderExtension
{
    public static void UseDigitalTwinContext(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.GetService<IServiceScopeFactory>()?.CreateScope();
        using var context = scope?.ServiceProvider.GetRequiredService<DigitalTwinContext>();
        context?.Database.Migrate();
    }
}