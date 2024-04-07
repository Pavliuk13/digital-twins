using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public sealed class OrganizationUserConfig : IEntityTypeConfiguration<OrganizationUser>
{
    public void Configure(EntityTypeBuilder<OrganizationUser> builder)
    {
        builder.HasKey(x => new { x.OrganizationId, x.UserId });
    }
}