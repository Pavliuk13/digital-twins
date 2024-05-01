using AutoMapper;
using DigitalTwins.Common.DTOs.Widget;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.Widget;

public class GetWidgetsForDeviceQuery : IRequest<IEnumerable<WidgetDTO>>
{
    public long DeviceId { get; set; }
}

public class GetWidgetsForDeviceQueryHandler : IRequestHandler<GetWidgetsForDeviceQuery, IEnumerable<WidgetDTO>>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public GetWidgetsForDeviceQueryHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<WidgetDTO>> Handle(GetWidgetsForDeviceQuery request, CancellationToken cancellationToken)
    {
        var templateId =
            (await _context.Devices.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.DeviceId, cancellationToken))?.TemplateId 
            ?? throw new KeyNotFoundException("Device not found");
        
        var widgets = await _context.Widgets.AsNoTracking()
            .Where(x => x.TemplateId == templateId)
            .ToListAsync(cancellationToken);

        var result = _mapper.Map<List<WidgetDTO>>(widgets);
        foreach (var widget in result)
        {
            var widgetDevice = await _context.WidgetDevices.AsNoTracking()
                .FirstOrDefaultAsync(x => x.DeviceId == request.DeviceId 
                                          && x.WidgetId == widget.Id, cancellationToken);

            if (widgetDevice is not null)
            {
                widget.Value = widgetDevice.Value;
            }
        }

        return result;
    }
}