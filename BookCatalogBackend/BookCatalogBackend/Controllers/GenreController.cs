using Microsoft.AspNetCore.Mvc;
using BookCatalogBackend.Services;
using BookCatalogBackend.models;
using BookCatalogBackend.DTOs;

[Route("api/[controller]")]
[ApiController]
public class GenreController : ControllerBase
{
    private readonly GenreService _genreService;

    public GenreController(GenreService genreService)
    {
        _genreService = genreService;
    }

    [HttpGet]
    public IActionResult GetGenres()
    {
        return Ok(_genreService.GetAllGenres());
    }

    [HttpPost]
    public IActionResult AddGenre([FromBody] GenreDto genreDto)
    {
        if (string.IsNullOrWhiteSpace(genreDto.Name))
        {
            return BadRequest("Genre name cannot be empty.");
        }

        var genre = new Genre
        {
            Name = genreDto.Name
        };

        _genreService.AddGenre(genre);
        return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult UpdateGenre(int id, [FromBody] GenreDto genreDto)
    {
        if (string.IsNullOrWhiteSpace(genreDto.Name))
        {
            return BadRequest("Genre name cannot be empty.");
        }

        var existingGenre = _genreService.GetGenreById(id);
        if (existingGenre == null)
        {
            return NotFound($"Genre with ID {id} not found.");
        }

        // Pass only ID and DTO to the service (don't modify DTO directly)
        _genreService.UpdateGenre(id, genreDto);

        return Ok("Genre updated successfully.");
    }



    [HttpDelete("{id}")]
    public IActionResult DeleteGenre(int id)
    {
        _genreService.DeleteGenre(id);
        return Ok();
    }
}
