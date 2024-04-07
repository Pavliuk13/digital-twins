using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public sealed class RoleOrganizationConfig : IEntityTypeConfiguration<RoleOrganization>
{
    public void Configure(EntityTypeBuilder<RoleOrganization> builder)
    {
        builder.HasKey(x => new { x.RoleId, x.OrganizationId });
    }
}