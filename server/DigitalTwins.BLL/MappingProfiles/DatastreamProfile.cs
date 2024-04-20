using AutoMapper;
using DigitalTwins.Common.DTOs.Datastream;
using DigitalTwins.DAL.Entities;

namespace DigitalTwins.BLL.MappingProfiles;

public class DatastreamProfile : Profile
{
    public DatastreamProfile()
    {
        CreateMap<Datastream, DatastreamDTO>();
    }
}