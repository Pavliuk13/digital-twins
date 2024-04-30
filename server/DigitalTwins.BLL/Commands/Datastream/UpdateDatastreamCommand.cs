using AutoMapper;
using DigitalTwins.Common.DTOs.Datastream;
using DigitalTwins.Common.Enums;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Datastream;

public class UpdateDatastreamCommand : IRequest<DatastreamDTO>
{
    public string Name { get; set; } = string.Empty;

    public string Alias { get; set; } = string.Empty;

    public Pin Pin { get; set; }

    public PinMode PinMode { get; set; }

    public long DatastreamId { get; set; }
}

public class UpdateDatastreamCommandValidator : AbstractValidator<UpdateDatastreamCommand>
{
    public UpdateDatastreamCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Datastream name can't be empty")
            .MaximumLength(100)
            .WithMessage("Datastream name can't be more than 100 symbols");
        
        RuleFor(x => x.Alias)
            .NotEmpty()
            .WithMessage("Datastream alias can't be empty")
            .MaximumLength(100)
            .WithMessage("Datastream alias can't be more than 100 symbols");
        
        RuleFor(x => x.Pin)
            .IsInEnum();
        
        RuleFor(x => x.PinMode)
            .IsInEnum();
        
        RuleFor(x => x.DatastreamId)
            .NotNull()
            .WithMessage("DatastreamId can't be null");
    }
}

public class UpdateDatastreamCommandHandler : IRequestHandler<UpdateDatastreamCommand, DatastreamDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public UpdateDatastreamCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<DatastreamDTO> Handle(UpdateDatastreamCommand request, CancellationToken cancellationToken)
    {
        var datastream =
            await _context.Datastreams.FirstOrDefaultAsync(x => x.Id == request.DatastreamId, cancellationToken)
            ?? throw new KeyNotFoundException("Datastream not found");

        datastream.Name = request.Name;
        datastream.Alias = request.Alias;
        datastream.Pin = request.Pin;
        datastream.PinMode = request.PinMode;
        
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<DatastreamDTO>(datastream);
    }
}