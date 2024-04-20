using AutoMapper;
using DigitalTwins.Common.DTOs.Device;
using DigitalTwins.DAL.Entities;

namespace DigitalTwins.BLL.MappingProfiles;

public class DeviceProfile : Profile
{
    public DeviceProfile()
    {
        CreateMap<Device, DeviceDTO>();
    }
}