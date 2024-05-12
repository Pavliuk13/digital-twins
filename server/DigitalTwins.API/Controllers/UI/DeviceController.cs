using DigitalTwins.BLL.Commands.Device;
using DigitalTwins.BLL.Queries.Device;
using DigitalTwins.Common.DTOs.Device;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DigitalTwins.API.Controllers.UI;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DeviceController : ControllerBase
{
    private readonly IMediator _mediator;

    public DeviceController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<DeviceDTO>))]
    public async Task<IActionResult> Get()
    {
        return Ok(await _mediator.Send(new GetDevicesByOrganizationQuery()));
    }
    
    [HttpGet("stats")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<StatisticDTO>))]
    public async Task<IActionResult> GetStats([FromQuery] long deviceId)
    {
        return Ok(await _mediator.Send(new GetDeviceStatisticsQuery { DeviceId = deviceId }));
    }
    
    [HttpGet("error-logs")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ErrorLogDTO>))]
    public async Task<IActionResult> GetErrorLogs([FromQuery] long deviceId)
    {
        return Ok(await _mediator.Send(new GetDeviceErrorLogsQuery { DeviceId = deviceId }));
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DeviceDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateDeviceCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DeviceDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromBody] UpdateDeviceCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete([FromQuery] long deviceId)
    {
        await _mediator.Send(new DeleteDeviceCommand { DeviceId = deviceId });
        
        return NoContent();
    }
}