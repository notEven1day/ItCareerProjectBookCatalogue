import { useEffect, useState } from "react";
import "./CreateBookForm.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { useLocation } from "react-router-dom";

const CreateBookForm = () => {
    const location = useLocation();
    const bookFromState = location.state || null;

    // Ensure bookGenres is always an array (use an empty array if undefined or null)
    const [book, setBook] = useState({
        title: bookFromState?.title || "",
        description: bookFromState?.description || "",
        publicationYear: bookFromState?.publicationYear || "",
        authorId: bookFromState?.author?.authorID || "",
        bookImageUrl: bookFromState?.bookImageUrl || "",
        genreIDs: Array.isArray(bookFromState?.bookGenres?.$values)
            ? bookFromState.bookGenres.$values.map(bg => bg.genreID) // Correct access to genreID
            : [],  // Fallback to an empty array if bookGenres.$values is not an array
    });

    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        // Fetch genres and authors for the dropdowns
        fetch("https://localhost:7110/api/Genre")
            .then(res => res.json())
            .then(data => setGenres(data.$values))
            .catch(err => console.error("Error fetching genres:", err));

        fetch("https://localhost:7110/api/Author")
            .then(res => res.json())
            .then(data => setAuthors(data.$values))
            .catch(err => console.error("Error fetching authors:", err));
    }, []);

    // Handle text inputs like title, description, etc.
    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    // Handle genre selection/deselection
    const handleGenreChange = (genreID) => {
        setBook(prevBook => ({
            ...prevBook,
            genreIDs: prevBook.genreIDs.includes(genreID)
                ? prevBook.genreIDs.filter(id => id !== genreID)  // Deselect genre
                : [...prevBook.genreIDs, genreID]  // Select genre
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = bookFromState ? "PUT" : "POST";
        const url = bookFromState
            ? `https://localhost:7110/api/Book/update-book/${bookFromState.bookID}`
            : "https://localhost:7110/api/Book/create-book";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });

            if (!response.ok) throw new Error("Failed to submit book.");
            alert(`Book ${bookFromState ? "updated" : "added"} successfully!`);
        } catch (error) {
            console.error("Error submitting book:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="book-form-container">
                <h2>{bookFromState ? "Update Book" : "Create Book"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={book.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="publicationYear"
                        placeholder="Publication Year"
                        value={book.publicationYear}
                        onChange={handleChange}
                        required
                    />

                    <select name="authorId" value={book.authorId} onChange={handleChange} required>
                        <option value="">Select Author</option>
                        {authors.map(author => (
                            <option key={author.authorID} value={author.authorID}>
                                {author.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="bookImageUrl"
                        placeholder="Image URL"
                        value={book.bookImageUrl}
                        onChange={handleChange}
                    />

                    <div className="genre-options">
                        {genres.map(genre => (
                            <label key={genre.genreID}>
                                <input
                                    type="checkbox"
                                    checked={book.genreIDs.includes(genre.genreID)} // Correctly check if genre is selected
                                    onChange={() => handleGenreChange(genre.genreID)}
                                />
                                {genre.name}
                            </label>
                        ))}
                    </div>

                    <button type="submit">{bookFromState ? "Update" : "Create"} Book</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CreateBookForm;
