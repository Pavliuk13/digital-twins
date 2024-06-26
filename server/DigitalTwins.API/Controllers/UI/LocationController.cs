using DigitalTwins.BLL.Commands.Location;
using DigitalTwins.BLL.Queries.Location;
using DigitalTwins.Common.DTOs.Location;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DigitalTwins.API.Controllers.UI;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class LocationController : ControllerBase
{
    private readonly IMediator _mediator;

    public LocationController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<LocationDTO>))]
    public async Task<IActionResult> Get()
    {
        return Ok(await _mediator.Send(new GetLocationsListQuery()));
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LocationDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateLocationCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LocationDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromBody] UpdateLocationCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPut("users")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LocationDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateUsers([FromBody] UpdateUsersInLocationCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete([FromQuery] long locationId)
    {
        await _mediator.Send(new DeleteLocationCommand { LocationId = locationId });
        
        return NoContent();
    }
}