using DigitalTwins.DAL.Context.Configurations;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.DAL.Context;

public static class ModelBuilderExtension
{
    public static void Configure(this ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DatastreamConfig).Assembly);
    }
}