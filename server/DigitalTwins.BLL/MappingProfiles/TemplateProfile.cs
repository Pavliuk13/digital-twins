using AutoMapper;
using DigitalTwins.Common.DTOs.Template;
using DigitalTwins.DAL.Entities;

namespace DigitalTwins.BLL.MappingProfiles;

public class TemplateProfile : Profile
{
    public TemplateProfile()
    {
        CreateMap<Template, TemplateDTO>();
    }
}