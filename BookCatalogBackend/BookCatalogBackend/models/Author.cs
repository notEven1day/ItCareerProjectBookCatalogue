using System.Text.Json.Serialization;

namespace BookCatalogBackend.models
{
    public class Author
    {
        public int AuthorID { get; set; }
        public string Name { get; set; }
        public string Biography { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? DateOfDeath { get; set; }

        public string AuthorImageUrl { get; set; }

        // Navigation property to the books
        [JsonIgnore]
        public ICollection<Book> Books { get; set; }
    }
}
