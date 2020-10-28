using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<NewContactDto, Contact>().ReverseMap();
            CreateMap<ContactForRetunDto, Contact>().ReverseMap();
            CreateMap<ContactForUpdateDto, Contact>();
        }
    }
}