using DigitalTwins.BLL.Commands.Template;
using DigitalTwins.BLL.Queries.Template;
using DigitalTwins.Common.DTOs.Template;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DigitalTwins.API.Controllers.UI;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TemplateController : ControllerBase
{
    private readonly IMediator _mediator;

    public TemplateController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TemplateDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get([FromQuery] long id)
    {
        return Ok(await _mediator.Send(new GetTemplateQuery { TemplateId = id }));
    }
    
    [HttpGet("current-user-templates")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<TemplateDTO>))]
    public async Task<IActionResult> GetCurrentUserTemplates([FromQuery] long id)
    {
        return Ok(await _mediator.Send(new GetCurrentUserTemplatesQuery { UserId = id }));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TemplateDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Create([FromBody] CreateTemplateCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TemplateDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromBody] UpdateTemplateCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete([FromQuery] long templateId)
    {
        await _mediator.Send(new DeleteTemplateCommand { TemplateId = templateId });
        return NoContent();
    }
}