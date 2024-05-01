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
    public async Task<IActionResult> Get([FromQuery] long organizationId)
    {
        return Ok(await _mediator.Send(new GetDevicesByOrganizationQuery { OrganizationId = organizationId }));
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