namespace DigitalTwins.Common.Options;

public class MqttOptions
{
    public static string SectionName => "Mqtt";

    public string ServerAddress { get; set; } = string.Empty;

    public int Port { get; set; }

    public string Username { get; set; } = string.Empty;
    
    public string Password { get; set; } = string.Empty;
}