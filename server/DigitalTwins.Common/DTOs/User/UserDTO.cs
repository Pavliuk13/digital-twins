using DigitalTwins.Common.Enums;

namespace DigitalTwins.Common.DTOs.User;

public class UserDTO
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public UserStatus Status { get; set; }

    public DateTime? LastLoginAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public string? InvitationCode { get; set; }
}