using DigitalTwins.API.Extensions;
using DigitalTwins.API.Middlewares;
using DigitalTwins.BLL;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);


builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", reloadOnChange: true, optional: true)
    .AddEnvironmentVariables()
    .Build();

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

builder.Services.AddDigitalTwinContext(builder.Configuration);
builder.Services.ConfigureJwt(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.RegisterCustomServices(builder.Configuration);
builder.Services.AddCors();
builder.Services.AddAutoMapper(typeof(DigitalTwinBllEntryPoint).Assembly);
builder.Services.AddMediatR(s => s.RegisterServicesFromAssembly(typeof(DigitalTwinBllEntryPoint).Assembly));
builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<DigitalTwinBllEntryPoint>());
builder.Services.AddHealthChecks();
builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddFirebaseAdmin(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseDigitalTwinContext();

app.UseMiddleware<GenericExceptionHandlerMiddleware>();

app.UseCors(opt => opt
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin());


app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();