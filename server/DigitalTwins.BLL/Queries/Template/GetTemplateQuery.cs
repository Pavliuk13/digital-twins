using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.Template;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Template;

public class GetTemplateQuery : IRequest<TemplateDTO>
{
    public long TemplateId { get; set; }
}

public class GetTemplateQueryHandler : IRequestHandler<GetTemplateQuery, TemplateDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetTemplateQueryHandler(DigitalTwinContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }
    
    public async Task<TemplateDTO> Handle(GetTemplateQuery request, CancellationToken cancellationToken)
    {
        var test = await _currentUserService.GetCurrentUserEmail();
        
        var template = await _context.Templates.AsNoTracking()
                .Include(x => x.Datastreams)
                .Include(x => x.Devices)
            .FirstOrDefaultAsync(x => x.Id == request.TemplateId, cancellationToken)
            ?? throw new KeyNotFoundException("Template was not found");
        
        return _mapper.Map<TemplateDTO>(template);
    }
}