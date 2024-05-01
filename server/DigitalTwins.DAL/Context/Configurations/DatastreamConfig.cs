using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public class DatastreamConfig : IEntityTypeConfiguration<Datastream>
{
    public void Configure(EntityTypeBuilder<Datastream> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(x => x.Alias)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(x => x.Pin)
            .IsRequired();
        
        builder.Property(x => x.PinMode)
            .IsRequired();
        
        builder.HasOne(x => x.Template)
            .WithMany(y => y.Datastreams)
            .HasForeignKey(x => x.TemplateId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}