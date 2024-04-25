using AutoMapper;
using DigitalTwins.Common.DTOs.Location;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Commands.Location;

public class CreateLocationCommand : IRequest<LocationDTO>
{
    public string Name { get; set; } = string.Empty;
    
    public string Address { get; set; } = string.Empty;
    
    public string Zip { get; set; } = string.Empty;
    
    public string State { get; set; } = string.Empty;
    
    public string City { get; set; } = string.Empty;
    
    public string Country { get; set; } = string.Empty;

    public long OrganizationId { get; set; }

    public long UserId { get; set; }
}

public class CreateLocationCommandValidator : AbstractValidator<CreateLocationCommand>
{
    public CreateLocationCommandValidator()
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

public class CreateLocationCommandHandler : IRequestHandler<CreateLocationCommand, LocationDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public CreateLocationCommandHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<LocationDTO> Handle(CreateLocationCommand request, CancellationToken cancellationToken)
    {
        var locationModel = new DAL.Entities.Location
        {
            Name = request.Name,
            Address = request.Address,
            State = request.State,
            City = request.City,
            Zip = request.Zip,
            Country = request.Country,
            CreatedBy = request.UserId,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            OrganizationId = request.OrganizationId
        };
        
        await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        
        _context.Locations.Add(locationModel);
        await _context.SaveChangesAsync(cancellationToken);
        
        await transaction.CommitAsync(cancellationToken);

        var owner = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);
        locationModel.Owner = owner ?? throw new KeyNotFoundException("User doesn't exist");

        return _mapper.Map<LocationDTO>(locationModel);
    }
}