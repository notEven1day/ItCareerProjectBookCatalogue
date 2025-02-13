namespace BookCatalogBackend.models
{
    public class Book
    {
        public int BookID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int PublicationYear { get; set; }
        public int? AuthorID { get; set; }  // Nullable because it can be null if there's no author
        public DateTime CreatedAt { get; set; }
        public string BookImageUrl { get; set; }

        // Navigation properties
        public Author Author { get; set; }
        public ICollection<BookGenre> BookGenres { get; set; }
    }
}
