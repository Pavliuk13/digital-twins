using DigitalTwins.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.DAL.Context;

public sealed class DigitalTwinContext : DbContext
{
    public DbSet<Datastream> Datastreams { get; }
    public DbSet<Device> Devices { get; }
    public DbSet<Location> Locations { get; }
    public DbSet<Organization> Organizations { get; }
    public DbSet<Permission> Permissions { get; }
    public DbSet<Role> Roles { get; }
    public DbSet<Template> Templates { get; }
    public DbSet<User> Users { get; }
    public DbSet<UserLocation> UserLocations { get; }
    public DbSet<UserOrganizationRole> UserOrganizationRoles { get; }
    public DbSet<OrganizationPermissionRole> OrganizationPermissionRoles { get; }

    public DigitalTwinContext(DbContextOptions<DigitalTwinContext> options) : base(options)
    {
        Datastreams = Set<Datastream>();
        Devices = Set<Device>();
        Locations = Set<Location>();
        Organizations = Set<Organization>();
        Permissions = Set<Permission>();
        Roles = Set<Role>();
        Templates = Set<Template>();
        Users = Set<User>();
        UserLocations = Set<UserLocation>();
        UserOrganizationRoles = Set<UserOrganizationRole>();
        OrganizationPermissionRoles = Set<OrganizationPermissionRole>();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Configure();
        modelBuilder.SetDefaultValues();
    }
}