namespace BookCatalogBackend.DTOs
{
    public class AuthorDto
    {
        public string Name { get; set; }
        public string Biography { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? DateOfDeath { get; set; } 
        public string? AuthorImageUrl { get; set; }
    }
}
