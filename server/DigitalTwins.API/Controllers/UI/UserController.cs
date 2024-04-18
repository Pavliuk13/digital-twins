using DigitalTwins.BLL.Commands.User;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DigitalTwins.API.Controllers.UI;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}