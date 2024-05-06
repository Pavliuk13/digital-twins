using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalTwins.DAL.Migrations
{
    public partial class AddAzureDigitalTwinUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AzureDigitalTwinUrl",
                table: "Devices",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AzureDigitalTwinUrl",
                table: "Devices");
        }
    }
}
