import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Book.css';
import {Button} from "antd";

// eslint-disable-next-line react/prop-types
function Book({ bookId, title, bookImageUrl, publicationYear, author , role, handleDelete }) {
    const navigate = useNavigate();

    const bookInfoPageRedirector = () => {
        navigate(`/book/${bookId}`);
    };

    return (
        <div onClick={bookInfoPageRedirector} className="Book">
            <img src={bookImageUrl} alt={title} className="book-image" />
            <div className="book-details-homepage">
                <h3 className="book-title">{title}</h3>
                <p className="book-publication-year">Year: {publicationYear}</p>
                <p className="book-author">Author: {author}</p>
            </div>
            {role === "Admin" && (
                <>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering bookInfoPageRedirector
                        handleDelete(bookId);
                    }}
                    className="delete-button"
                >
                    Delete Book
                </button>
                </>
            )}
        </div>
    );
}

export default Book;
