using AutoMapper;
using DigitalTwins.Common.DTOs.Device;
using DigitalTwins.DAL.Entities;

namespace DigitalTwins.BLL.MappingProfiles;

public class StatisticProfile : Profile
{
    public StatisticProfile()
    {
        CreateMap<Statistic, StatisticDTO>();
    }
}