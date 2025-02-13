namespace BookCatalogBackend.DTOs
{
    public class BookDtoWithGenres
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int PublicationYear { get; set; }
        public int? AuthorId { get; set; }  // Nullable if the book has no author
        public string? BookImageUrl { get; set; }
        public List<int> GenreIDs { get; set; }
    }
}
