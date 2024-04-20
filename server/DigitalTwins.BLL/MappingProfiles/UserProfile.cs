using AutoMapper;
using DigitalTwins.Common.DTOs.User;
using DigitalTwins.DAL.Entities;

namespace DigitalTwins.BLL.MappingProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDTO>();
    }
}