using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public sealed class PermissionRoleConfig : IEntityTypeConfiguration<PermissionRole>
{
    public void Configure(EntityTypeBuilder<PermissionRole> builder)
    {
        builder.HasKey(x => new { x.PermissionId, x.RoleId });
    }
}