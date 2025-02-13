namespace BookCatalogBackend.DTOs
{
    public class BookDto
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int PublicationYear { get; set; }
        public int? AuthorId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string BookImageUrl { get; set; }
    }
}
