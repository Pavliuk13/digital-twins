using AutoMapper;
using DigitalTwins.Common.DTOs.Mqtt;

namespace DigitalTwins.BLL.MappingProfiles;

public sealed class MqttProfile : Profile
{
    public MqttProfile()
    {
        CreateMap<MqttRequestDTO, MqttResponseDTO>();
    }
}