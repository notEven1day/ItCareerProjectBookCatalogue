import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./AuthorAdminConsole.css";
import Header from "../Header/Header.jsx";
import {Button} from "antd";




const AuthorAdminConsole = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleCreateAuthor = () =>
    {
        navigate(`/author-cu`);
    }
    const handleUpdateClick = (author) => {
        console.log(author);
        // Navigating to the update form page with the author data
        navigate(`/author-cu`, { state: { author } });
    };
    const handleDeleteClick = (authorID) => {
        // Confirm deletion
        if (window.confirm("Are you sure you want to delete this author?")) {
            // Send DELETE request to backend
            fetch(`https://localhost:7110/api/Author/delete-author/${authorID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Author deleted successfully!");
                        setAuthors((prevAuthors) => prevAuthors.filter((author) => author.authorID !== authorID));
                        // Optionally, refresh the authors list or navigate
                        // navigate("/"); // Or perform another action like fetching updated list
                    } else {
                        alert("Failed to delete author");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting author:", error);
                    alert("An error occurred while deleting the author.");
                });
        }
    };



    useEffect(() => {
        fetch("https://localhost:7110/api/Author")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch authors");
                }
                return response.json();
            })
            .then((data) => {
                setAuthors(data.$values);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching authors:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading authors...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Header></Header>
            <Button onClick={handleCreateAuthor}>Create Author</Button>
            <div className="author-container">

                {authors.map((author) => (
                    <div key={author.authorID} className="author-card">
                        <img src={author.authorImageUrl} alt={author.name} className="author-image"/>
                        <h3>{author.name}</h3>
                        <Button onClick={() => handleUpdateClick(author)} className="update-button">Update Author</Button>
                        <Button type="danger" color="red" variant="solid" onClick={() => handleDeleteClick(author.authorID)}>Delete Author</Button>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AuthorAdminConsole;
