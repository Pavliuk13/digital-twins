using DigitalTwins.BLL.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Model;
using Task = System.Threading.Tasks.Task;

namespace DigitalTwins.BLL.Services;

public class EmailService : IEmailService
{
    private readonly string _senderEmail;
    private readonly string _senderName;
    private readonly ILogger<EmailService> _logger;
    private readonly TransactionalEmailsApi _api;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _senderEmail = configuration["Sender:Email"];
        _senderName = configuration["Sender:Name"];
        _logger = logger;
        _api = new TransactionalEmailsApi();
    }
    
    public async Task SendInvitationAsync(string name, string email, string code)
    {
        var body = $@"{name} Welcome!
        We're excited to see you on board.
        To get started, you'll need to create a password for your account.
        Here is your invitation code: {code}";
        
        var subject = "Welcome to SmartLabs";

        await SendEmailAsync(email, body, subject);
    }
    
    public async Task SendEmailAsync(string recipient, string body, string subject)
    {
        var email = new SendSmtpEmailSender(_senderName, _senderEmail);
        var smtpEmailTo = new SendSmtpEmailTo(recipient);
        var recipients = new List<SendSmtpEmailTo> { smtpEmailTo };
        
        try
        {
            var sendSmtpEmail = new SendSmtpEmail(email, recipients, null, null, null, body, subject);
            _ = await _api.SendTransacEmailAsync(sendSmtpEmail);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Email wasn't sent");
            throw;
        }
    }
}