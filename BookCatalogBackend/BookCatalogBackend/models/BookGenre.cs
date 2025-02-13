namespace BookCatalogBackend.models
{
    public class BookGenre
    {
        public int BookID { get; set; }
        public int GenreID { get; set; }

        // Navigation properties
        public Book Book { get; set; }
        public Genre Genre { get; set; }
    }
}
