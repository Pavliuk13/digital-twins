namespace DigitalTwins.DAL.Entities;

public class Location
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

    public Organization Organization { get; set; } = null!;

    public IEnumerable<User> Users { get; set; } = null!;
}