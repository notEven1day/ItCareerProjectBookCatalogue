using BookCatalogBackend.DTOs;
using BookCatalogBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookCatalogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        // GET: api/book/getAllBooks
        [HttpGet("getAllBooks")]
        public async Task<ActionResult<List<BookDto>>> GetAllBooks()
        {
            try
            {
                // Fetch books and map them to BookDto format
                var books = await _bookService.GetAllBooksAsync();
                return Ok(books); // Return the list of BookDtos
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound("Book not found");
            }

            var author = await _bookService.GetAuthorByBookIdAsync(id);
            if (author == null)
            {
                return NotFound("Author not found");
            }

            return Ok(new { book, author });
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var deleted = await _bookService.DeleteBookAsync(id);
            if (!deleted)
            {
                return NotFound("Book not found.");
            }

            return NoContent(); // 204 No Content
        }

        [HttpPost("create-book")]
        public IActionResult AddBook([FromBody] BookDtoWithGenres bookDto)
        {
            if (bookDto == null)
            {
                return BadRequest("Book data is required.");
            }

            if (string.IsNullOrWhiteSpace(bookDto.Title) || string.IsNullOrWhiteSpace(bookDto.Description))
            {
                return BadRequest("Title and Description cannot be empty.");
            }

            try
            {
                _bookService.AddBook(bookDto);
                return Ok("Book added successfully!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding the book: {ex.Message}");
            }
        }

        [HttpPut("update-book/{id}")]
        public IActionResult UpdateBook(int id, [FromBody] BookDtoWithGenres bookDto)
        {
            if (bookDto == null)
            {
                return BadRequest("Invalid book data.");
            }

            try
            {
                _bookService.UpdateBook(id, bookDto);
                return Ok(new { message = "Book updated successfully" });
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
