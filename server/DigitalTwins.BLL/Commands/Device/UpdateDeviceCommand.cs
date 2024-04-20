using AutoMapper;
using DigitalTwins.Common.DTOs.Device;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Device;

public class UpdateDeviceCommand : IRequest<DeviceDTO>
{
    public long DeviceId { get; set; }

    public string Name { get; set; } = string.Empty;
}

public class UpdateDeviceCommandValidator : AbstractValidator<UpdateDeviceCommand>
{
    public UpdateDeviceCommandValidator()
    {
        RuleFor(x => x.DeviceId)
            .NotNull()
            .WithMessage("DeviceId can't be null");
        
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Device name can't be empty")
            .MaximumLength(50)
            .WithMessage("Device name can't be longer than 50 symbols");
    }
}

public class UpdateDeviceCommandHandler : IRequestHandler<UpdateDeviceCommand, DeviceDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public UpdateDeviceCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<DeviceDTO> Handle(UpdateDeviceCommand request, CancellationToken cancellationToken)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        
        var device = await _context.Devices.FirstOrDefaultAsync(x => x.Id == request.DeviceId, cancellationToken)
                       ?? throw new KeyNotFoundException("Device was not found");

        device.Name = request.Name;
        
        await _context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync(cancellationToken);

        return _mapper.Map<DeviceDTO>(device);
    }
}