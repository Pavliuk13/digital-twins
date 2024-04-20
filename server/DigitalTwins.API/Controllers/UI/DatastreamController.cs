using DigitalTwins.BLL.Commands.Datastream;
using DigitalTwins.BLL.Queries.Datastream;
using DigitalTwins.Common.DTOs.Datastream;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DigitalTwins.API.Controllers.UI;

[ApiController]
[Route("api/[controller]")]
public class DatastreamController : ControllerBase
{
    private readonly IMediator _mediator;

    public DatastreamController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<DatastreamDTO>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Get([FromQuery] long templateId)
    {
        return Ok(await _mediator.Send(new GetDatastremsByTemplateQuery { TemplateId = templateId }));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DatastreamDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateDatastreamCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DatastreamDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromBody] UpdateDatastreamCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpDelete("{datastreamId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(long datastreamId)
    {
        await _mediator.Send(new DeleteDatastreamCommand { DatastreamId = datastreamId });
        
        return NoContent();
    }
}