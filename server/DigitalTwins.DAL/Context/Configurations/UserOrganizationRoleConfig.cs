using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public class UserOrganizationRoleConfig : IEntityTypeConfiguration<UserOrganizationRole>
{
    public void Configure(EntityTypeBuilder<UserOrganizationRole> builder)
    {
        builder.HasKey(x => new { x.UserId, x.OrganizationId, x.RoleId });
        
        builder.Property(x => x.UserId)
            .IsRequired();
        
        builder.Property(x => x.OrganizationId)
            .IsRequired();
        
        builder.Property(x => x.RoleId)
            .IsRequired();

        builder.HasOne(x => x.User)
            .WithMany(y => y.UserOrganizationRoles)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder.HasOne(x => x.Organization)
            .WithMany(y => y.UserOrganizationRoles)
            .HasForeignKey(x => x.OrganizationId)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder.HasOne(x => x.Role)
            .WithMany(y => y.UserOrganizationRoles)
            .HasForeignKey(x => x.RoleId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}