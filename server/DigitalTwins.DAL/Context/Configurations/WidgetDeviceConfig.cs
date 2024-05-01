using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public class WidgetDeviceConfig : IEntityTypeConfiguration<WidgetDevice>
{
    public void Configure(EntityTypeBuilder<WidgetDevice> builder)
    {
        builder.HasKey(x => new { x.DeviceId, x.WidgetId });
        
        builder.HasOne(x => x.Device)
            .WithMany(y => y.WidgetDevices)
            .HasForeignKey(x => x.DeviceId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.Widget)
            .WithMany(y => y.WidgetDevices)
            .HasForeignKey(x => x.WidgetId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}