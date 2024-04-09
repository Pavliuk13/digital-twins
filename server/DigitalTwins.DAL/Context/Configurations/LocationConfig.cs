using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public class LocationConfig : IEntityTypeConfiguration<Location>
{
    public void Configure(EntityTypeBuilder<Location> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Address)
            .IsRequired();
        
        builder.Property(x => x.Zip)
            .HasMaxLength(18)
            .IsRequired();
        
        builder.Property(x => x.State)
            .HasMaxLength(100)
            .IsRequired();
        
        builder.Property(x => x.City)
            .IsRequired()
            .HasMaxLength(189);
        
        builder.Property(x => x.Country)
            .IsRequired()
            .HasMaxLength(90);

        builder.HasOne(x => x.Organization)
            .WithMany(y => y.Locations)
            .HasForeignKey(x => x.OrganizationId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}