using AutoMapper;
using DigitalTwins.Common.DTOs.Location;
using DigitalTwins.DAL.Entities;

namespace DigitalTwins.BLL.MappingProfiles;

public class LocationProfile : Profile
{
    public LocationProfile()
    {
        CreateMap<Location, LocationDTO>();
    }
}