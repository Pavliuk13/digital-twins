using AutoMapper;
using DigitalTwins.BLL.Interfaces;
using DigitalTwins.Common.DTOs.Location;
using DigitalTwins.DAL.Context;
using FluentValidation;
using MediatR;

namespace DigitalTwins.BLL.Commands.Location;

public class CreateLocationCommand : IRequest<LocationDTO>
{
    public string Name { get; set; } = string.Empty;
    
    public string Address { get; set; } = string.Empty;
    
    public string Zip { get; set; } = string.Empty;
    
    public string State { get; set; } = string.Empty;
    
    public string City { get; set; } = string.Empty;
    
    public string Country { get; set; } = string.Empty;
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
    private readonly ICurrentUserService _currentUserService;

    public CreateLocationCommandHandler(DigitalTwinContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }
    
    public async Task<LocationDTO> Handle(CreateLocationCommand request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUser();
        var organizationId = await _currentUserService.GetCurrentOrganizationId();
        
        var locationModel = new DAL.Entities.Location
        {
            Name = request.Name,
            Address = request.Address,
            State = request.State,
            City = request.City,
            Zip = request.Zip,
            Country = request.Country,
            CreatedBy = user.Id,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            OrganizationId = organizationId
        };
        
        _context.Locations.Add(locationModel);
        await _context.SaveChangesAsync(cancellationToken);

        var result = _mapper.Map<LocationDTO>(locationModel);
        result.Owner = user;

        return result;
    }
}