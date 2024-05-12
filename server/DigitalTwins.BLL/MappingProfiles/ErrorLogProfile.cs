using AutoMapper;
using DigitalTwins.Common.DTOs.Device;
using DigitalTwins.DAL.Entities;

namespace DigitalTwins.BLL.MappingProfiles;

public class ErrorLogProfile : Profile
{
    public ErrorLogProfile()
    {
        CreateMap<ErrorLog, ErrorLogDTO>();
    }
}