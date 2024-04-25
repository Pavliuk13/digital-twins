using AutoMapper;
using DigitalTwins.Common.DTOs.Location;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Location;

public class UpdateLocationCommand : IRequest<LocationDTO>
{
    public long LocationId { get; set; }
    
    public string Name { get; set; } = string.Empty;
    
    public string Address { get; set; } = string.Empty;
    
    public string Zip { get; set; } = string.Empty;
    
    public string State { get; set; } = string.Empty;
    
    public string City { get; set; } = string.Empty;
    
    public string Country { get; set; } = string.Empty;
}

public class UpdateLocationCommandValidator : AbstractValidator<UpdateLocationCommand>
{
    public UpdateLocationCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Location name can't be empty")
            .MaximumLength(100)
            .WithMessage("Location name can't be longer than 100 symbols");
        
        RuleFor(x => x.Address)
            .NotEmpty()
            .WithMessage("Address can't be empty");
        
        RuleFor(x => x.Zip)
            .NotEmpty()
            .WithMessage("Zip can't be empty")
            .MaximumLength(18)
            .WithMessage("Zip can't be longer than 18 symbols");
        
        RuleFor(x => x.State)
            .NotEmpty()
            .WithMessage("State can't be empty")
            .MaximumLength(100)
            .WithMessage("State can't be longer than 100 symbols");
        
        RuleFor(x => x.City)
            .NotEmpty()
            .WithMessage("City can't be empty")
            .MaximumLength(189)
            .WithMessage("City can't be longer than 189 symbols");
        
        RuleFor(x => x.Country)
            .NotEmpty()
            .WithMessage("Country can't be empty")
            .MaximumLength(90)
            .WithMessage("Country can't be longer than 90 symbols");
    }
}

public class UpdateLocationCommandHandler : IRequestHandler<UpdateLocationCommand, LocationDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public UpdateLocationCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<LocationDTO> Handle(UpdateLocationCommand request, CancellationToken cancellationToken)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        
        var location = await _context.Locations
            .Include(x => x.Owner)
            .FirstOrDefaultAsync(x => x.Id == request.LocationId, cancellationToken)
            ?? throw new KeyNotFoundException("Location was not found");

        location.Address = request.Address;
        location.Name = request.Name;
        location.City = request.City;
        location.Country = request.Country;
        location.Zip = request.Zip;
        location.State = request.State;
        location.UpdatedAt = DateTime.Now;
        
        await _context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync(cancellationToken);

        return _mapper.Map<LocationDTO>(location);
    }
}