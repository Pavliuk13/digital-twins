using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Model;
using Task = System.Threading.Tasks.Task;

namespace DigitalTwins.BLL.Services;

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;
    private readonly IOptions<SenderOptions> _options;
    private readonly TransactionalEmailsApi _api;

    public EmailService(ILogger<EmailService> logger, IOptions<SenderOptions> options)
    {
        _logger = logger;
        _options = options;
        _api = new TransactionalEmailsApi();
    }
    
    public async Task SendInvitationAsync(string name, string email, string code)
    {
        var urlWithCode = string.Format(_options.Value.InvitationUrl, code);
        
        var body = $@"{name}, welcome!
        We're excited to see you on board.
        To get started, you'll need to create a password for your account.
        Navigate by url to complete your registration: <a href=""{urlWithCode}"">{urlWithCode}</a>";
        
        var subject = "Welcome to SmartLabs";

        await SendEmailAsync(email, body, subject);
    }
    
    public async Task SendEmailAsync(string recipient, string body, string subject)
    {
        var email = new SendSmtpEmailSender(_options.Value.Name, _options.Value.Email);
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
        }
    }
}