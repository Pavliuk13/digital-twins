namespace DigitalTwins.BLL.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string recipient, string body, string subject);
    
    Task SendInvitationAsync(string name, string email, string code);
}