using BookCatalogBackend.DTOs;
using BookCatalogBackend.models;
using BookCatalogBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookCatalogBackend.Controllers
{
   
        [Route("api/[controller]")]
        [ApiController]
        public class AuthorController : ControllerBase
        {
            private readonly AuthorService _authorService;

            // Injecting the AuthorService
            public AuthorController(AuthorService authorService)
            {
                _authorService = authorService;
            }

        // POST: api/author
        [HttpPost("create-author")]
        public async Task<ActionResult<Author>> CreateAuthor(AuthorDto authorDTO)
        {
            try
            {
                // Call the service to create the author using the AuthorDTO
                var createdAuthor = await _authorService.CreateAuthorAsync(authorDTO);

                // Return a 201 Created response, including the newly created author's data
                return CreatedAtAction(nameof(GetAuthorById), new { id = createdAuthor.AuthorID }, createdAuthor);
            }
            catch (Exception ex)
            {
                // Return a BadRequest response if an error occurs
                return BadRequest($"Error creating author: {ex.Message}");
            }
        }

        // GET: api/author/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthorById(int id)
        {
            var author = await _authorService.GetAuthorByIdAsync(id);
            if (author == null)
            {
                return NotFound();
            }
            return author;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAuthors()
        {
            var authors = await _authorService.GetAllAuthorsAsync();
            return Ok(authors);
        }

        [HttpPut("update-author/{id}")]
        public async Task<IActionResult> UpdateAuthor(int id, [FromBody] AuthorDto authorDto)
        {
            if (authorDto == null)
            {
                return BadRequest("Invalid author data.");
            }

            var updatedAuthor = await _authorService.UpdateAuthorAsync(id, authorDto);
            if (updatedAuthor == null)
            {
                return NotFound($"Author with ID {id} not found.");
            }

            return Ok(updatedAuthor); // Return the updated author object
        }

        [HttpDelete("delete-author/{authorID}")]
        public async Task<IActionResult> DeleteAuthor(int authorID)
        {
            try
            {
                var result = await _authorService.DeleteAuthorAsync(authorID);

                if (result)
                {
                    return NoContent();  // HTTP 204 No Content on success
                }
                else
                {
                    return NotFound();  // HTTP 404 Not Found if author not found
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");  // HTTP 500 on server error
            }
        }
    }
}

