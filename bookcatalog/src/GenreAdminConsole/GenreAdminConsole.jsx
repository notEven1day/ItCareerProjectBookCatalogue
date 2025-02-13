import { useState, useEffect } from "react";
import "./GenreAdminConsole.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const GenreAdminConsole = () => {
    const [genres, setGenres] = useState([]);
    const [newGenreName, setNewGenreName] = useState("");
    const [editingGenre, setEditingGenre] = useState(null);
    const [updatedGenreName, setUpdatedGenreName] = useState("");

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch("https://localhost:7110/api/Genre");
            if (!response.ok) throw new Error("Failed to fetch genres.");
            const data = await response.json();
            setGenres(data?.$values || []); // Extracting $values safely
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    const handleAddGenre = async () => {
        if (!newGenreName.trim()) return alert("Genre name cannot be empty!");
        try {
            const response = await fetch("https://localhost:7110/api/Genre", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newGenreName }),
            });

            if (!response.ok) throw new Error("Failed to add genre.");

            alert("Genre added successfully!");
            setNewGenreName("");
            fetchGenres();
        } catch (error) {
            console.error("Error adding genre:", error);
        }
    };

    const handleDeleteGenre = async (genreID) => {
        if (!window.confirm("Are you sure you want to delete this genre?")) return;
        try {
            const response = await fetch(`https://localhost:7110/api/Genre/${genreID}`, { method: "DELETE" });

            if (!response.ok) throw new Error("Failed to delete genre.");

            alert("Genre deleted successfully!");
            setGenres((prevGenres) => prevGenres.filter((genre) => genre.genreID !== genreID));
        } catch (error) {
            console.error("Error deleting genre:", error);
        }
    };

    const handleUpdateGenre = async () => {
        if (!updatedGenreName.trim()) return alert("Genre name cannot be empty!");

        try {
            const response = await fetch(`https://localhost:7110/api/Genre/${editingGenre.genreID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: updatedGenreName }),
            });

            if (!response.ok) throw new Error("Failed to update genre.");

            alert("Genre updated successfully!");
            setEditingGenre(null);
            setUpdatedGenreName("");
            fetchGenres();
        } catch (error) {
            console.error("Error updating genre:", error);
        }
    };

    return (
        <div>
            <Header/>
        <div className="genre-admin-container">
            <h2>Genre Admin Console</h2>

            <div className="add-genre-container">
                <input
                    type="text"
                    placeholder="Enter new genre name"
                    value={newGenreName}
                    onChange={(e) => setNewGenreName(e.target.value)}
                />
                <button className="add-button" onClick={handleAddGenre}>
                    Add Genre
                </button>
            </div>

            <table className="genre-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {genres.map((genre) => (
                    <tr key={genre.genreID}>
                        <td>{genre.genreID}</td>
                        <td>
                            {editingGenre?.genreID === genre.genreID ? (
                                <input
                                    type="text"
                                    value={updatedGenreName}
                                    onChange={(e) => setUpdatedGenreName(e.target.value)}
                                />
                            ) : (
                                genre.name
                            )}
                        </td>
                        <td>
                            {editingGenre?.genreID === genre.genreID ? (
                                <button className="update-button" onClick={handleUpdateGenre}>
                                    Save
                                </button>
                            ) : (
                                <button className="edit-button" onClick={() => { setEditingGenre(genre); setUpdatedGenreName(genre.name); }}>
                                    ✏️
                                </button>
                            )}
                            <button className="delete-button" onClick={() => handleDeleteGenre(genre.genreID)}>
                                ❌
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
            <Footer/>
        </div>
    );
};

export default GenreAdminConsole;
