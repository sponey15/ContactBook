using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IContactsRepository _repo;
        public ContactsController(IContactsRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost("createContact")]
        public async Task<ActionResult<ContactForRetunDto>> CreateContact(NewContactDto newContactDto)
        {
            var contact = _mapper.Map<Contact>(newContactDto);
            
            _repo.Add(contact);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception("Saving contact didn't succeed");
        }

        [HttpGet("allContacts")]
        public async Task<ActionResult<ContactForRetunDto>> GetAllContacts()
        {
            var contactsFromRepo = await _repo.GetAllContacts();   

            var contactsForReturn = _mapper.Map<IEnumerable<ContactForRetunDto>>(contactsFromRepo);

            return Ok(contactsForReturn);
        }

        [HttpPut("updateContact/{contactId}")]
        public async Task<ActionResult<ContactForRetunDto>> UpdateContact(int contactId, ContactForUpdateDto contactForUpdateDto)
        {
            var contactFromRepo = await _repo.GetContact(contactId);

            var updatedContact = _mapper.Map(contactForUpdateDto, contactFromRepo);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception("Saving contact didn't succeed");
        }

        [HttpGet("getContact/{contactId}")]
        public async Task<ActionResult<ContactForRetunDto>> GetContact(int contactId)
        {
            var contactFromRepo = await _repo.GetContact(contactId);

            var contactForRetun = _mapper.Map<ContactForRetunDto>(contactFromRepo);
            
            if (contactForRetun != null)
            {
                return Ok(contactForRetun);
            }

            throw new Exception("Getting contact didn't succeed");
        }
    }
}