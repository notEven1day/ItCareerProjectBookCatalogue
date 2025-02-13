import {Link, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import "./BookInfoPage.css";
import {useSelector} from "react-redux";

const BookInfoPage = () => {
    const { id } = useParams(); // Get the book id from URL params
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user); // Access user data from the Redux store
    const role = user?.role;

    // Fetch book and author data based on the book id
    useEffect(() => {
        const fetchBookInfo = async () => {
            try {
                const response = await fetch(`https://localhost:7110/api/Book/${id}`);
                if (!response.ok) {
                    throw new Error("Book not found");
                }
                const data = await response.json();
                console.log(data);
                setBook(data.book);
                setAuthor(data.book.author);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBookInfo();
    }, [id]);

    // Return loading state or error message if needed
    if (loading) {
        return (
            <div>
                <Header />
                <div>Loading book details...</div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <div>Error: {error}</div>
                <Footer />
            </div>
        );
    }

    const handleUpdateBook = () => {
        navigate(`/update-book/${id}`, { state: book });
    };
    // Render book and author details once data is fetched
    return (
        <div>
            <Header />
            <div className="book-info-page">
                <h1>{book?.title}</h1>
                <div className="book-details">
                    <img
                        src={book?.bookImageUrl}
                        alt={book?.title}
                        className="book-cover"
                    />
                    <div className="book-description">
                        <h3>Description:</h3>
                        <p>{book?.description}</p>
                        <p><strong>Publication Year:</strong> {book?.publicationYear}</p>
                    </div>
                </div>

                <div className="author-details">
                    <h2>Author: {author?.name}</h2>
                    <img
                        src={author?.authorImageUrl}
                        alt={author?.name}
                        className="author-image"
                    />
                    <p><strong>Biography:</strong> {author?.biography}</p>
                    <p><strong>Date of Birth:</strong> {author?.dateOfBirth}</p>
                    {author?.dateOfDeath && (
                        <p><strong>Date of Death:</strong> {author?.dateOfDeath}</p>
                    )}
                </div>
                {user ? (
                    role === 'Admin' && (
                        <>
                            <button onClick={handleUpdateBook} className="update-book-button">
                                Update Book
                            </button>
                        </>
                    )
                ) : null}
            </div>
            <Footer/>
        </div>
    );
};

export default BookInfoPage;
