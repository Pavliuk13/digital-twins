using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public sealed class RoleConfig : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(20);

        builder.HasMany(x => x.Organizations)
            .WithMany(y => y.Roles)
            .UsingEntity<RoleOrganization>();
    }
}