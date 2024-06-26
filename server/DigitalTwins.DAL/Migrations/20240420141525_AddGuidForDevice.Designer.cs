﻿// <auto-generated />
using System;
using DigitalTwins.DAL.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DigitalTwins.DAL.Migrations
{
    [DbContext(typeof(DigitalTwinContext))]
    [Migration("20240420141525_AddGuidForDevice")]
    partial class AddGuidForDevice
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.28")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Datastream", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Alias")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Pin")
                        .HasColumnType("int");

                    b.Property<int>("PinMode")
                        .HasColumnType("int");

                    b.Property<long>("TemplateId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("TemplateId");

                    b.ToTable("Datastreams");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Device", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(1);

                    b.Property<long>("TemplateId")
                        .HasColumnType("bigint");

                    b.Property<Guid>("UGuid")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("TemplateId");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Location", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(189)
                        .HasColumnType("nvarchar(189)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(90)
                        .HasColumnType("nvarchar(90)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<long>("OrganizationId")
                        .HasColumnType("bigint");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Zip")
                        .IsRequired()
                        .HasMaxLength(18)
                        .HasColumnType("nvarchar(18)");

                    b.HasKey("Id");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Organization", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("LogoUrl")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.OrganizationPermissionRole", b =>
                {
                    b.Property<long>("OrganizationId")
                        .HasColumnType("bigint");

                    b.Property<long>("PermissionId")
                        .HasColumnType("bigint");

                    b.Property<long>("RoleId")
                        .HasColumnType("bigint");

                    b.HasKey("OrganizationId", "PermissionId", "RoleId");

                    b.HasIndex("PermissionId");

                    b.HasIndex("RoleId");

                    b.ToTable("OrganizationPermissionRoles");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Permission", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Key")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Permissions");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Key = "users",
                            Value = "View users"
                        },
                        new
                        {
                            Id = 2L,
                            Key = "users",
                            Value = "Invite new users"
                        },
                        new
                        {
                            Id = 3L,
                            Key = "users",
                            Value = "Edit users"
                        },
                        new
                        {
                            Id = 4L,
                            Key = "users",
                            Value = "Delete users"
                        },
                        new
                        {
                            Id = 5L,
                            Key = "users",
                            Value = "Transfer users"
                        },
                        new
                        {
                            Id = 6L,
                            Key = "devices",
                            Value = "View devices"
                        },
                        new
                        {
                            Id = 7L,
                            Key = "devices",
                            Value = "Create devices"
                        },
                        new
                        {
                            Id = 8L,
                            Key = "devices",
                            Value = "Edit devices"
                        },
                        new
                        {
                            Id = 9L,
                            Key = "devices",
                            Value = "Delete devices"
                        },
                        new
                        {
                            Id = 10L,
                            Key = "templates",
                            Value = "View templates"
                        },
                        new
                        {
                            Id = 11L,
                            Key = "templates",
                            Value = "Edit templates"
                        },
                        new
                        {
                            Id = 12L,
                            Key = "templates",
                            Value = "Create templates"
                        },
                        new
                        {
                            Id = 13L,
                            Key = "templates",
                            Value = "Delete templates"
                        },
                        new
                        {
                            Id = 14L,
                            Key = "organizations",
                            Value = "Access organization settings"
                        },
                        new
                        {
                            Id = 15L,
                            Key = "locations",
                            Value = "View locations"
                        },
                        new
                        {
                            Id = 16L,
                            Key = "locations",
                            Value = "Create locations"
                        },
                        new
                        {
                            Id = 17L,
                            Key = "locations",
                            Value = "Edit locations"
                        },
                        new
                        {
                            Id = 18L,
                            Key = "locations",
                            Value = "Delete locations"
                        },
                        new
                        {
                            Id = 19L,
                            Key = "locations",
                            Value = "Assign users to locations"
                        });
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Role", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Name = "Admin"
                        },
                        new
                        {
                            Id = 2L,
                            Name = "User"
                        });
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Template", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("ConnectionType")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("bigint");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Hardware")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<long>("OrganizationId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Templates");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("InvitationCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastLoginAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.UserLocation", b =>
                {
                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<long>("LocationId")
                        .HasColumnType("bigint");

                    b.HasKey("UserId", "LocationId");

                    b.HasIndex("LocationId");

                    b.ToTable("UserLocation");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.UserOrganizationRole", b =>
                {
                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<long>("OrganizationId")
                        .HasColumnType("bigint");

                    b.Property<long>("RoleId")
                        .HasColumnType("bigint");

                    b.HasKey("UserId", "OrganizationId", "RoleId");

                    b.HasIndex("OrganizationId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserOrganizationRoles");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.UserRole", b =>
                {
                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<long>("RoleId")
                        .HasColumnType("bigint");

                    b.HasKey("UserId", "RoleId");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Datastream", b =>
                {
                    b.HasOne("DigitalTwins.DAL.Entities.Template", "Template")
                        .WithMany("Datastreams")
                        .HasForeignKey("TemplateId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Template");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Device", b =>
                {
                    b.HasOne("DigitalTwins.DAL.Entities.User", "User")
                        .WithMany("Devices")
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("DigitalTwins.DAL.Entities.Template", "Template")
                        .WithMany("Devices")
                        .HasForeignKey("TemplateId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Template");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Location", b =>
                {
                    b.HasOne("DigitalTwins.DAL.Entities.Organization", "Organization")
                        .WithMany("Locations")
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Organization");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.OrganizationPermissionRole", b =>
                {
                    b.HasOne("DigitalTwins.DAL.Entities.Organization", "Organization")
                        .WithMany("OrganizationPermissionRoles")
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("DigitalTwins.DAL.Entities.Permission", "Permission")
                        .WithMany("OrganizationPermissionRoles")
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("DigitalTwins.DAL.Entities.Role", "Role")
                        .WithMany("OrganizationPermissionRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Organization");

                    b.Navigation("Permission");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Template", b =>
                {
                    b.HasOne("DigitalTwins.DAL.Entities.User", "User")
                        .WithMany("Templates")
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("DigitalTwins.DAL.Entities.Organization", "Organization")
                        .WithMany("Templates")
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Organization");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.UserLocation", b =>
                {
                    b.HasOne("DigitalTwins.DAL.Entities.Location", null)
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DigitalTwins.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.UserOrganizationRole", b =>
                {
                    b.HasOne("DigitalTwins.DAL.Entities.Organization", "Organization")
                        .WithMany("UserOrganizationRoles")
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("DigitalTwins.DAL.Entities.Role", "Role")
                        .WithMany("UserOrganizationRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("DigitalTwins.DAL.Entities.User", "User")
                        .WithMany("UserOrganizationRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Organization");

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Organization", b =>
                {
                    b.Navigation("Locations");

                    b.Navigation("OrganizationPermissionRoles");

                    b.Navigation("Templates");

                    b.Navigation("UserOrganizationRoles");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Permission", b =>
                {
                    b.Navigation("OrganizationPermissionRoles");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Role", b =>
                {
                    b.Navigation("OrganizationPermissionRoles");

                    b.Navigation("UserOrganizationRoles");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.Template", b =>
                {
                    b.Navigation("Datastreams");

                    b.Navigation("Devices");
                });

            modelBuilder.Entity("DigitalTwins.DAL.Entities.User", b =>
                {
                    b.Navigation("Devices");

                    b.Navigation("Templates");

                    b.Navigation("UserOrganizationRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
