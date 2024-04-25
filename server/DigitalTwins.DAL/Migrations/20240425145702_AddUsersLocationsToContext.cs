using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalTwins.DAL.Migrations
{
    public partial class AddUsersLocationsToContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLocation_Locations_LocationId",
                table: "UserLocation");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLocation_Users_UserId",
                table: "UserLocation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLocation",
                table: "UserLocation");

            migrationBuilder.RenameTable(
                name: "UserLocation",
                newName: "UserLocations");

            migrationBuilder.RenameIndex(
                name: "IX_UserLocation_LocationId",
                table: "UserLocations",
                newName: "IX_UserLocations_LocationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLocations",
                table: "UserLocations",
                columns: new[] { "UserId", "LocationId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserLocations_Locations_LocationId",
                table: "UserLocations",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLocations_Users_UserId",
                table: "UserLocations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLocations_Locations_LocationId",
                table: "UserLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLocations_Users_UserId",
                table: "UserLocations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLocations",
                table: "UserLocations");

            migrationBuilder.RenameTable(
                name: "UserLocations",
                newName: "UserLocation");

            migrationBuilder.RenameIndex(
                name: "IX_UserLocations_LocationId",
                table: "UserLocation",
                newName: "IX_UserLocation_LocationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLocation",
                table: "UserLocation",
                columns: new[] { "UserId", "LocationId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserLocation_Locations_LocationId",
                table: "UserLocation",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLocation_Users_UserId",
                table: "UserLocation",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
