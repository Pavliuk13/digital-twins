using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DigitalTwins.DAL.Context.Configurations;

public class UserLocationConfig : IEntityTypeConfiguration<UserLocation>
{
    public void Configure(EntityTypeBuilder<UserLocation> builder)
    {
        builder.HasKey(x => new { x.UserId, x.LocationId });
    }
}