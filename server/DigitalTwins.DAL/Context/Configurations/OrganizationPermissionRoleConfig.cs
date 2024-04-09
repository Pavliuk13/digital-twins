using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public class OrganizationPermissionRoleConfig : IEntityTypeConfiguration<OrganizationPermissionRole>
{
    public void Configure(EntityTypeBuilder<OrganizationPermissionRole> builder)
    {
        builder.HasKey(x => new { x.OrganizationId, x.PermissionId, x.RoleId });

        builder.Property(x => x.PermissionId)
            .IsRequired();
        
        builder.Property(x => x.OrganizationId)
            .IsRequired();
        
        builder.Property(x => x.RoleId)
            .IsRequired();

        builder.HasOne(x => x.Organization)
            .WithMany(y => y.OrganizationPermissionRoles)
            .HasForeignKey(x => x.OrganizationId)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder.HasOne(x => x.Permission)
            .WithMany(y => y.OrganizationPermissionRoles)
            .HasForeignKey(x => x.PermissionId)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder.HasOne(x => x.Role)
            .WithMany(y => y.OrganizationPermissionRoles)
            .HasForeignKey(x => x.RoleId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}