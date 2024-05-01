using DigitalTwins.BLL.Commands.Widget;
using DigitalTwins.BLL.Queries.Widget;
using DigitalTwins.Common.DTOs.Widget;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DigitalTwins.API.Controllers.UI;

[ApiController]
[Route("api/[controller]")]
public class WidgetController : ControllerBase
{
    private readonly IMediator _mediator;

    public WidgetController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet("template")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<WidgetDTO>))]
    public async Task<IActionResult> GetForTemplate([FromQuery] long templateId)
    {
        return Ok(await _mediator.Send(new GetWidgetsForTemplateQuery { TemplateId = templateId }));
    }
    
    [HttpGet("device")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<WidgetDTO>))]
    public async Task<IActionResult> GetForDevice([FromQuery] long deviceId)
    {
        return Ok(await _mediator.Send(new GetWidgetsForDeviceQuery { DeviceId = deviceId }));
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(WidgetDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateWidgetCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(WidgetDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromBody] UpdateWidgetCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete([FromQuery] long widgetId)
    {
        await _mediator.Send(new DeleteWidgetCommand { WidgetId = widgetId });
        return NoContent();
    }
}