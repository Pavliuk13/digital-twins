using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace DigitalTwins.API.Controllers.Mqtt;

[ApiController]
[Route("api/[controller]")]
public class MqqtController : ControllerBase
{
    private readonly IMqttService _service;
    
    public MqqtController(IMqttService service)
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