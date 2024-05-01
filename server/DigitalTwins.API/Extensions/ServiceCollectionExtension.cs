using DigitalTwins.BLL.Interfaces;
using DigitalTwins.BLL.Services;
using DigitalTwins.Common.DTOs.Firebase;
using DigitalTwins.Common.Options;
using DigitalTwins.DAL.Context;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DigitalTwins.API.Extensions;

public static class ServiceCollectionExtension
{
    public static void AddDigitalTwinContext(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionsString = configuration.GetConnectionString("DigitalTwinDBConnection");
        services.AddDbContext<DigitalTwinContext>(options =>
        options.UseSqlServer(
            connectionsString,
            sqlServerOptions => sqlServerOptions
                .MigrationsAssembly(typeof(DigitalTwinContext).Assembly.GetName().Name)
                .EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(10),
                    errorNumbersToAdd: null)
        ));
    }
    
    public static void RegisterCustomServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<MqttOptions>(configuration.GetSection(MqttOptions.SectionName));
        
        services.AddHostedService<MqttSubscriber>();
        services.AddSingleton<IMqttSubscriber, MqttSubscriber>();
        services.AddScoped<IMqttPublisher, MqttPublisher>();
        services.AddScoped<IDeviceService, DeviceService>();
    }
    
    public static void ConfigureJwt(this IServiceCollection services, IConfiguration configuration)
    {
        var authority = configuration["Jwt:Firebase:ValidIssuer"];
        var audience = configuration["Jwt:Firebase:ValidAudience"];
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.Authority = authority;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = authority,
                    ValidateAudience = true,
                    ValidAudience = audience,
                    ValidateLifetime = true
                };
            });
    }
    
    public static void AddFirebaseAdmin(this IServiceCollection services, IConfiguration configuration)
    {
        var serviceAccount = configuration
            .GetSection("FirebaseServiceAccount")
            .Get<ServiceAccount>();

        if (serviceAccount is not null)
        {
            serviceAccount.PrivateKeyId = configuration["Firebase_Service_Account_Private_Id"];
            serviceAccount.PrivateKey = configuration["Firebase_Service_Account_Private_Key"].Replace(@"\n", "\n");
        }

        var jsonSerializerSettings = new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver { NamingStrategy = new SnakeCaseNamingStrategy() }
        };
        
        FirebaseApp.Create(new AppOptions
        {
            Credential = GoogleCredential.FromJson(JsonConvert.SerializeObject(serviceAccount, jsonSerializerSettings))
        });

        services.AddTransient<FirebaseAuth>(_ => FirebaseAuth.DefaultInstance);
    }
}