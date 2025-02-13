// AuthorService.cs
using BookCatalogBackend.DTOs;
using BookCatalogBackend.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace BookCatalogBackend.Services
{
    public class AuthorService
    {
        private readonly ApplicationDbContext _context;

        // Constructor to inject ApplicationDbContext
        public AuthorService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create an author using AuthorDTO
        public async Task<Author> CreateAuthorAsync(AuthorDto authorDTO)
        {
            if (authorDTO == null)
                throw new ArgumentNullException(nameof(authorDTO));

            // Check if an author with the same name already exists
            var authorExists = await _context.Authors
            .AnyAsync(a => a.Name.ToLower() == authorDTO.Name.ToLower());

            if (authorExists)
            {
                // If the author already exists, you can throw an exception or return null, depending on your design
                throw new InvalidOperationException($"An author with the name '{authorDTO.Name}' already exists.Are you meaning to update him/her?");
            }

            // Manually map the AuthorDTO to the Author entity
            var author = new Author
            {
                Name = authorDTO.Name,
                Biography = authorDTO.Biography,
                DateOfBirth = authorDTO.DateOfBirth,
                DateOfDeath = authorDTO.DateOfDeath, // Nullable DateTime, can be null if the author is alive
                AuthorImageUrl = string.IsNullOrWhiteSpace(authorDTO.AuthorImageUrl)
                                 ? "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg" // Default image if no URL is provided
                                 : authorDTO.AuthorImageUrl
            };

            // Add the new author to the database
            _context.Authors.Add(author);
            await _context.SaveChangesAsync(); // Save changes to the database

            return author; // Return the created author
        }

        // Optional: Get an author by ID (for any other operations)
        public async Task<Author> GetAuthorByIdAsync(int id)
        {
            return await _context.Authors
                                 .FirstOrDefaultAsync(a => a.AuthorID == id);
        }
        public async Task<List<Author>> GetAllAuthorsAsync()
        {
            return await _context.Authors.ToListAsync();
        }

        public async Task<Author> UpdateAuthorAsync(int authorId, AuthorDto authorDto)
        {
            var author = await _context.Authors.FindAsync(authorId);
            if (author == null)
            {
                return null; // Or throw exception if you want to handle not found explicitly
            }

            // Map the AuthorDto to the Author entity
            author.Name = authorDto.Name;
            author.Biography = authorDto.Biography;
            author.DateOfBirth = authorDto.DateOfBirth;
            author.DateOfDeath = authorDto.DateOfDeath;
            author.AuthorImageUrl = authorDto.AuthorImageUrl;

            // Save the changes to the database
            await _context.SaveChangesAsync();
            return author;
        }

        public async Task<bool> DeleteAuthorAsync(int authorID)
        {
            var author = await _context.Authors.FindAsync(authorID);
            if (author == null)
            {
                return false; // Return false if the author doesn't exist
            }

            _context.Authors.Remove(author);  // Remove the author from the DB
            await _context.SaveChangesAsync();  // Save changes to the DB

            return true; // Return true if the deletion was successful
        }
    }

}
