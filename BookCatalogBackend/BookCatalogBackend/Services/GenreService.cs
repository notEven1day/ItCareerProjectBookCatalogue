using BookCatalogBackend.DTOs;
using BookCatalogBackend.models;

namespace BookCatalogBackend.Services
{
    public class GenreService
    {
        private readonly ApplicationDbContext _context;

        public GenreService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Genre> GetAllGenres()
        {
            return _context.Genres.ToList();
        }

        public Genre GetGenreById(int id)
        {
            return _context.Genres.FirstOrDefault(g => g.GenreID == id);
        }

        public void AddGenre(Genre genre)
        {
            _context.Genres.Add(genre);
            _context.SaveChanges();
        }

        public void UpdateGenre(int id, GenreDto genreDto)
        {
            if (string.IsNullOrWhiteSpace(genreDto.Name))
            {
                throw new ArgumentException("Genre name cannot be empty.");
            }

            var existingGenre = _context.Genres.FirstOrDefault(g => g.GenreID == id);
            if (existingGenre == null)
            {
                throw new KeyNotFoundException($"Genre with ID {id} not found.");
            }

            existingGenre.Name = genreDto.Name; // Only updating the name

            _context.SaveChanges();
        }


        public void DeleteGenre(int id)
        {
            var genre = _context.Genres.FirstOrDefault(g => g.GenreID == id);
            if (genre != null)
            {
                _context.Genres.Remove(genre);
                _context.SaveChanges();
            }
        }
    }
}
