using DigitalTwins.BLL.Commands.User;
using DigitalTwins.Common.DTOs.User;
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

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}