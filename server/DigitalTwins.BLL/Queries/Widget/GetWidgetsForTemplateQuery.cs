using AutoMapper;
using DigitalTwins.Common.DTOs.Widget;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Widget;

public class GetWidgetsForTemplateQuery : IRequest<IEnumerable<WidgetDTO>>
{
    public long TemplateId { get; set; }
}

public class GetWidgetsForTemplateQueryHandler : IRequestHandler<GetWidgetsForTemplateQuery, IEnumerable<WidgetDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public GetWidgetsForTemplateQueryHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<WidgetDTO>> Handle(GetWidgetsForTemplateQuery request, CancellationToken cancellationToken)
    {
        var widgets = await _context.Widgets.AsNoTracking()
            .Where(x => x.TemplateId == request.TemplateId)
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<WidgetDTO>>(widgets);
    }
}

