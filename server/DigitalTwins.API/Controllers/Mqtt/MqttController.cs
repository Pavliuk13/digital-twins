using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.Mqtt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DigitalTwins.API.Controllers.Mqtt;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class MqttController : ControllerBase
{
    private readonly IMqttPublisher _service;
    
    public MqttController(IMqttPublisher service)
    {
        _service = service;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Post([FromBody] MqttRequestDTO requestDto)
    {
        await _service.PublishAsync(requestDto);
        
        return Ok();
    }
}