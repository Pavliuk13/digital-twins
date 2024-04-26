using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalTwins.DAL.Migrations
{
    public partial class AddOwnerToLocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CreatedBy",
                table: "Locations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Locations_CreatedBy",
                table: "Locations",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Users_CreatedBy",
                table: "Locations",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Users_CreatedBy",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Locations_CreatedBy",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Locations");
        }
    }
}
