using DigitalTwins.BLL.Commands.User;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.BLL.Queries.User;
using DigitalTwins.Common.DTOs.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DigitalTwins.API.Controllers.UI;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ICurrentUserService _currentUserService;

    public UserController(IMediator mediator, ICurrentUserService currentUserService)
    {
        _mediator = mediator;
        _currentUserService = currentUserService;
    }
    
    [HttpGet("current")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    public async Task<IActionResult> GetCurrent()
    {
        return Ok(await _currentUserService.GetCurrentUser());
    }
    
    [AllowAnonymous]
    [HttpGet("by-invitation-code")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    public async Task<IActionResult> GetByInvitationCode([FromQuery] string invitationCode)
    {
        return Ok(await _mediator.Send(new GetUserByInvitationCodeQuery { InvitationCode = invitationCode }));
    }
    
    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserDTO>))]
    public async Task<IActionResult> GetList()
    {
        return Ok(await _mediator.Send(new GetUsersListQuery()));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPost("invite-user")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddMember([FromBody] InviteUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPost("accept-invitation")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AcceptInvitation([FromBody] AcceptInvitationCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromBody] UpdateUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}