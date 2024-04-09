using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public class TemplateConfig : IEntityTypeConfiguration<Template>
{
    public void Configure(EntityTypeBuilder<Template> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Hardware)
            .IsRequired();
        
        builder.Property(x => x.ConnectionType)
            .IsRequired();
        
        builder.Property(x => x.Description)
            .HasMaxLength(500);

        builder.HasOne(x => x.Organization)
            .WithMany(y => y.Templates)
            .HasForeignKey(x => x.OrganizationId)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder.HasOne(x => x.User)
            .WithMany(y => y.Templates)
            .HasForeignKey(x => x.CreatedBy)
            .OnDelete(DeleteBehavior.NoAction);
    }
}