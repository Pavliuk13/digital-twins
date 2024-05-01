using AutoMapper;
using DigitalTwins.Common.DTOs.Widget;
using DigitalTwins.DAL.Entities;

namespace DigitalTwins.BLL.MappingProfiles;

public class WidgetProfile : Profile
{
    public WidgetProfile()
    {
        CreateMap<Widget, WidgetDTO>();
    }
}