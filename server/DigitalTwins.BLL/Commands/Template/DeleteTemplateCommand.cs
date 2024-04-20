using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Template;

public class DeleteTemplateCommand : IRequest
{
    public long TemplateId { get; set; }
}

public class DeleteTemplateCommandHandler : IRequestHandler<DeleteTemplateCommand>
{
    private readonly DigitalTwinContext _context;

    public DeleteTemplateCommandHandler(DigitalTwinContext context)
    {
        _context = context;
    }
    
    public async Task Handle(DeleteTemplateCommand request, CancellationToken cancellationToken)
    {
        var template = await _context.Templates.FirstOrDefaultAsync(x => x.Id == request.TemplateId, cancellationToken)
            ?? throw new KeyNotFoundException("Template was not found");

        _context.Templates.Remove(template);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
