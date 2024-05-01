using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalTwins.DAL.Migrations
{
    public partial class AddWidgetAndWidgetDeviceTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Widgets",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    DatastreamId = table.Column<long>(type: "bigint", nullable: false),
                    TemplateId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Widgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Widgets_Datastreams_DatastreamId",
                        column: x => x.DatastreamId,
                        principalTable: "Datastreams",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Widgets_Templates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Templates",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WidgetDevices",
                columns: table => new
                {
                    WidgetId = table.Column<long>(type: "bigint", nullable: false),
                    DeviceId = table.Column<long>(type: "bigint", nullable: false),
                    Value = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WidgetDevices", x => new { x.DeviceId, x.WidgetId });
                    table.ForeignKey(
                        name: "FK_WidgetDevices_Devices_DeviceId",
                        column: x => x.DeviceId,
                        principalTable: "Devices",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WidgetDevices_Widgets_WidgetId",
                        column: x => x.WidgetId,
                        principalTable: "Widgets",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_WidgetDevices_WidgetId",
                table: "WidgetDevices",
                column: "WidgetId");

            migrationBuilder.CreateIndex(
                name: "IX_Widgets_DatastreamId",
                table: "Widgets",
                column: "DatastreamId");

            migrationBuilder.CreateIndex(
                name: "IX_Widgets_TemplateId",
                table: "Widgets",
                column: "TemplateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WidgetDevices");

            migrationBuilder.DropTable(
                name: "Widgets");
        }
    }
}
