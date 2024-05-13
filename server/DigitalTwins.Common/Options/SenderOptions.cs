namespace DigitalTwins.Common.Options;

public class SenderOptions
{
    public static string SectionName => "Sender";

    public string Email { get; set; } = string.Empty;
    
    public string Name { get; set; } = string.Empty;
    
    public string InvitationUrl { get; set; } = string.Empty;
}