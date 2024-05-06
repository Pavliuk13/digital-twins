using DigitalTwins.Common.Enums;
using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public class DeviceConfig : IEntityTypeConfiguration<Device>
{
    public void Configure(EntityTypeBuilder<Device> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(x => x.TopicName)
            .HasMaxLength(50);
        
        builder.Property(x => x.AzureDigitalTwinUrl)
            .HasMaxLength(200);
        
        builder.Property(x => x.Status)
            .HasDefaultValue(Status.Offline);

        builder.HasOne(x => x.Template)
            .WithMany(y => y.Devices)
            .HasForeignKey(x => x.TemplateId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.User)
            .WithMany(y => y.Devices)
            .HasForeignKey(x => x.CreatedBy)
            .OnDelete(DeleteBehavior.NoAction);
    }
}