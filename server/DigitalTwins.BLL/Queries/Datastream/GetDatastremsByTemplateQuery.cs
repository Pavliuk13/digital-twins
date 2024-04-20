using AutoMapper;
using DigitalTwins.Common.DTOs.Datastream;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Datastream;

public class GetDatastremsByTemplateQuery : IRequest<List<DatastreamDTO>>
{
    public long TemplateId { get; set; }
}

public class GetDatastremsByTemplateQueryHandler : IRequestHandler<GetDatastremsByTemplateQuery, List<DatastreamDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public GetDatastremsByTemplateQueryHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<List<DatastreamDTO>> Handle(GetDatastremsByTemplateQuery request, CancellationToken cancellationToken)
    {
        var datastreams = await _context.Datastreams
            .AsNoTracking()
            .Where(x => x.TemplateId == request.TemplateId)
            .ToListAsync(cancellationToken);
        
        return _mapper.Map<List<DatastreamDTO>>(datastreams);
    }
}
