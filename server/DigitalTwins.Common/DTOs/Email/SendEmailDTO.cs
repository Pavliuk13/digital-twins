namespace DigitalTwins.Common.DTOs.Email;

public class SendEmailDTO
{
    public string Recipient { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
}