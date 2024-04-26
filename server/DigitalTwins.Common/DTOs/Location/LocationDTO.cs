using DigitalTwins.Common.DTOs.User;

namespace DigitalTwins.Common.DTOs.Location;

public class LocationDTO
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string Address { get; set; } = string.Empty;
    
    public string Zip { get; set; } = string.Empty;
    
    public string State { get; set; } = string.Empty;
    
    public string City { get; set; } = string.Empty;
    
    public string Country { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }

    public long OrganizationId { get; set; }

    public long CreatedBy { get; set; }
    
    public IEnumerable<long> UsersIds { get; set; } = null!;
    
    public UserDTO Owner { get; set; } = null!;
}