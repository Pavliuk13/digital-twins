using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public class WidgetConfig : IEntityTypeConfiguration<Widget>
{
    public void Configure(EntityTypeBuilder<Widget> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasOne(x => x.Template)
            .WithMany(y => y.Widgets)
            .HasForeignKey(x => x.TemplateId)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder.HasOne(x => x.Datastream)
            .WithMany(y => y.Widgets)
            .HasForeignKey(x => x.DatastreamId)
            .OnDelete(DeleteBehavior.ClientSetNull);
    }
}