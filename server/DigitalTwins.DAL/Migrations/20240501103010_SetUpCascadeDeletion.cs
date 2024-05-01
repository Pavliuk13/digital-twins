using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalTwins.DAL.Migrations
{
    public partial class SetUpCascadeDeletion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Datastreams_Templates_TemplateId",
                table: "Datastreams");

            migrationBuilder.DropForeignKey(
                name: "FK_Devices_Templates_TemplateId",
                table: "Devices");

            migrationBuilder.DropForeignKey(
                name: "FK_WidgetDevices_Devices_DeviceId",
                table: "WidgetDevices");

            migrationBuilder.DropForeignKey(
                name: "FK_WidgetDevices_Widgets_WidgetId",
                table: "WidgetDevices");

            migrationBuilder.AddForeignKey(
                name: "FK_Datastreams_Templates_TemplateId",
                table: "Datastreams",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_Templates_TemplateId",
                table: "Devices",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WidgetDevices_Devices_DeviceId",
                table: "WidgetDevices",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WidgetDevices_Widgets_WidgetId",
                table: "WidgetDevices",
                column: "WidgetId",
                principalTable: "Widgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Datastreams_Templates_TemplateId",
                table: "Datastreams");

            migrationBuilder.DropForeignKey(
                name: "FK_Devices_Templates_TemplateId",
                table: "Devices");

            migrationBuilder.DropForeignKey(
                name: "FK_WidgetDevices_Devices_DeviceId",
                table: "WidgetDevices");

            migrationBuilder.DropForeignKey(
                name: "FK_WidgetDevices_Widgets_WidgetId",
                table: "WidgetDevices");

            migrationBuilder.AddForeignKey(
                name: "FK_Datastreams_Templates_TemplateId",
                table: "Datastreams",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_Templates_TemplateId",
                table: "Devices",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WidgetDevices_Devices_DeviceId",
                table: "WidgetDevices",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WidgetDevices_Widgets_WidgetId",
                table: "WidgetDevices",
                column: "WidgetId",
                principalTable: "Widgets",
                principalColumn: "Id");
        }
    }
}
