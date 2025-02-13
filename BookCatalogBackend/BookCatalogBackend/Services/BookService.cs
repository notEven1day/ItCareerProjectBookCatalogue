using BookCatalogBackend.DTOs;
using BookCatalogBackend.models;
using Microsoft.EntityFrameworkCore;

namespace BookCatalogBackend.Services
{
    public class BookService
    {
        private readonly ApplicationDbContext _context;

        public BookService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Fetch all books and map them to BookDto
        public async Task<List<BookDto>> GetAllBooksAsync()
        {
            var books = await _context.Books
                .Include(b => b.Author)            // Include related Author
                .Include(b => b.BookGenres)        // Include related BookGenres
                .ToListAsync();

            var bookDtos = books.Select(b => new BookDto
            {
                BookId = b.BookID,
                Title = b.Title,
                Description = b.Description,
                PublicationYear = b.PublicationYear,
                AuthorId = b.AuthorID,
                CreatedAt = b.CreatedAt,
                BookImageUrl = b.BookImageUrl
            }).ToList();

            return bookDtos;
        }

        // Fetch book by id
        public async Task<Book> GetBookByIdAsync(int id)
        {
            return await _context.Books
                .Include(b => b.Author)
                .Include(b => b.BookGenres) // Include the related BookGenres
                .ThenInclude(bg => bg.Genre) // Include the related Genre (assuming you have a Genre entity)// Include the related Author
                .FirstOrDefaultAsync(b => b.BookID == id);
        }

        // Fetch author by book id
        public async Task<Author> GetAuthorByBookIdAsync(int bookId)
        {
            var book = await _context.Books
                .Include(b => b.Author) // Make sure to include author while fetching the book
                .FirstOrDefaultAsync(b => b.BookID == bookId);

            return book?.Author; // Return the Author for the given book
        }

        public async Task<bool> DeleteBookAsync(int bookId)
        {
            var book = await _context.Books.FindAsync(bookId);
            if (book == null)
            {
                return false; // Book not found
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return true; // Successfully deleted
        }

        public void AddBook(BookDtoWithGenres bookDto)
        {
            var book = new Book
            {
                Title = bookDto.Title,
                Description = bookDto.Description,
                PublicationYear = bookDto.PublicationYear,
                AuthorID = bookDto.AuthorId,
                CreatedAt = DateTime.UtcNow,
                BookImageUrl = bookDto.BookImageUrl,
                BookGenres = bookDto.GenreIDs.Select(id => new BookGenre { GenreID = id }).ToList()
            };

            _context.Books.Add(book);
            _context.SaveChanges();
        }

        public void UpdateBook(int id, BookDtoWithGenres bookDto)
        {
            var existingBook = _context.Books.FirstOrDefault(b => b.BookID == id);

            if (existingBook == null)
            {
                throw new ArgumentException($"Book with ID {id} not found.");
            }

            // Update properties of the existing book
            existingBook.Title = bookDto.Title;
            existingBook.Description = bookDto.Description;
            existingBook.PublicationYear = bookDto.PublicationYear;
            existingBook.AuthorID = bookDto.AuthorId;
            existingBook.BookImageUrl = bookDto.BookImageUrl;

            // Remove all current genre associations for the book
            var existingGenres = _context.BookGenres.Where(bg => bg.BookID == id).ToList();
            _context.BookGenres.RemoveRange(existingGenres);

            // Update the genres (remove old ones and add new ones)
            existingBook.BookGenres = bookDto.GenreIDs.Select(id => new BookGenre { GenreID = id }).ToList();

            _context.SaveChanges();
        }
    }
}
