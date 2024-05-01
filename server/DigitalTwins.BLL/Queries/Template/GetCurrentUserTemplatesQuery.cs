using AutoMapper;
using DigitalTwins.Common.DTOs.Template;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Template;

public class GetCurrentUserTemplatesQuery : IRequest<List<TemplateDTO>>
{
    public long UserId { get; set; }
}

public class GetCurrentUserTemplatesQueryHandler : IRequestHandler<GetCurrentUserTemplatesQuery, List<TemplateDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public GetCurrentUserTemplatesQueryHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<List<TemplateDTO>> Handle(GetCurrentUserTemplatesQuery request, CancellationToken cancellationToken)
    {
        var templates = await _context.Templates.AsNoTracking()
                .Include(x => x.Datastreams)
                .Include(x => x.Devices)
            .Where(x => x.CreatedBy == request.UserId)
            .ToListAsync(cancellationToken);
        
        return _mapper.Map<List<TemplateDTO>>(templates);
    }
}