using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.Device;
using DigitalTwins.Common.Enums;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Device;

public class CreateDeviceCommand : IRequest<DeviceDTO>
{
    public long TemplateId { get; set; }

    public string Name { get; set; } = string.Empty;
}

public class CreateDeviceCommandValidator : AbstractValidator<CreateDeviceCommand>
{
    public CreateDeviceCommandValidator()
    {
        RuleFor(x => x.TemplateId)
            .NotNull()
            .WithMessage("TemplateId can't be null");
        
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Device name can't be empty")
            .MaximumLength(50)
            .WithMessage("Device name can't be longer than 50 symbols");
    }
}

public class CreateDeviceCommandHandler : IRequestHandler<CreateDeviceCommand, DeviceDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public CreateDeviceCommandHandler(DigitalTwinContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }
    
    public async Task<DeviceDTO> Handle(CreateDeviceCommand request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUser();
        
        var template = await _context.Templates.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.TemplateId, cancellationToken)
            ?? throw new KeyNotFoundException("Template doesn't exist");
        
        var deviceModel = new DAL.Entities.Device
        {
            UGuid = Guid.NewGuid(),
            Name = request.Name,
            CreatedBy = user.Id,
            Status = Status.Offline,
            TemplateId = request.TemplateId
        };

        deviceModel.TopicName = $"{template.Hardware}/{deviceModel.UGuid}";
        
        _context.Devices.Add(deviceModel);
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<DeviceDTO>(deviceModel);
    }
}