using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ContactsRepository : IContactsRepository
    {
        private readonly DataContext _context;
        public ContactsRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Contact>> GetAllContacts()
        {
            var lessons = await _context.Contacts.ToListAsync();

            return lessons;
        }

        public async Task<Contact> GetContact(int contactId)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(u => u.Id == contactId);

            return contact;
        }
    }
}