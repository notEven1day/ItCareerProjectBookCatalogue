namespace BookCatalogBackend.models
{
    public class Genre
    {
        public int GenreID { get; set; }
        public string Name { get; set; }

        // Navigation property to the BookGenres relationship table
        public ICollection<BookGenre> BookGenres { get; set; }
    }
}
