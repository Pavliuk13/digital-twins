using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.Template;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Template;

public class GetCurrentUserTemplatesQuery : IRequest<List<TemplateDTO>>
{
    
}

public class GetCurrentUserTemplatesQueryHandler : IRequestHandler<GetCurrentUserTemplatesQuery, List<TemplateDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetCurrentUserTemplatesQueryHandler(DigitalTwinContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }
    
    public async Task<List<TemplateDTO>> Handle(GetCurrentUserTemplatesQuery request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUser();
        
        var templates = await _context.Templates.AsNoTracking()
                .Include(x => x.Datastreams)
                .Include(x => x.Devices)
            .Where(x => x.CreatedBy == user.Id)
            .ToListAsync(cancellationToken);
        
        return _mapper.Map<List<TemplateDTO>>(templates);
    }
}