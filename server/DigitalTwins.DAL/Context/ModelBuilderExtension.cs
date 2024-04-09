using DigitalTwins.DAL.Context.Configurations;
using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.DAL.Context;

public static class ModelBuilderExtension
{
    public static void Configure(this ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DatastreamConfig).Assembly);
    }

    public static void SetDefaultValues(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>().HasData(GetRoles());
        modelBuilder.Entity<Permission>().HasData(GetPemissions());
    }

    private static IEnumerable<Role> GetRoles()
    {
        return new List<Role>
        {
            new()
            {
                Id = 1,
                Name = "Admin"
            },
            new()
            {
                Id = 2,
                Name = "User"
            }
        };
    }
    
    private static IEnumerable<Permission> GetPemissions()
    {
        return new List<Permission>
        {
            new()
            {
                Id = 1,
                Key = "users",
                Value = "View users"
            },
            new()
            {
                Id = 2,
                Key = "users",
                Value = "Invite new users"
            },
            new()
            {
                Id = 3,
                Key = "users",
                Value = "Edit users"
            },
            new()
            {
                Id = 4,
                Key = "users",
                Value = "Delete users"
            },
            new()
            {
                Id = 5,
                Key = "users",
                Value = "Transfer users"
            },
            new()
            {
                Id = 6,
                Key = "devices",
                Value = "View devices"
            },
            new()
            {
                Id = 7,
                Key = "devices",
                Value = "Create devices"
            },
            new()
            {
                Id = 8,
                Key = "devices",
                Value = "Edit devices"
            },
            new()
            {
                Id = 9,
                Key = "devices",
                Value = "Delete devices"
            },
            new()
            {
                Id = 10,
                Key = "templates",
                Value = "View templates"
            },
            new()
            {
                Id = 11,
                Key = "templates",
                Value = "Edit templates"
            },
            new()
            {
                Id = 12,
                Key = "templates",
                Value = "Create templates"
            },
            new()
            {
                Id = 13,
                Key = "templates",
                Value = "Delete templates"
            },
            new()
            {
                Id = 14,
                Key = "organizations",
                Value = "Access organization settings"
            },
            new()
            {
                Id = 15,
                Key = "locations",
                Value = "View locations"
            },
            new()
            {
                Id = 16,
                Key = "locations",
                Value = "Create locations"
            },
            new()
            {
                Id = 17,
                Key = "locations",
                Value = "Edit locations"
            },
            new()
            {
                Id = 18,
                Key = "locations",
                Value = "Delete locations"
            },
            new()
            {
                Id = 19,
                Key = "locations",
                Value = "Assign users to locations"
            }
        };
    } 
}