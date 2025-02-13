import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import "./CreateOrUpdateAuthorForm.css";

const CreateOrUpdateAuthorForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authorFromState = location.state?.author;// Getting author data from state if available


    const [author, setAuthor] = useState({
        name: "",
        biography: "",
        dateOfBirth: "",
        dateOfDeath: "",
        authorImageUrl: ""
    });

    useEffect(() => {
        if (authorFromState) {
            setAuthor({
                name: authorFromState.name,
                biography: authorFromState.biography,
                // Format dates to "YYYY-MM-DD" if they exist
                dateOfBirth: authorFromState.dateOfBirth ? authorFromState.dateOfBirth.split('T')[0] : "",
                dateOfDeath: authorFromState.dateOfDeath ? authorFromState.dateOfDeath.split('T')[0] : "",
                authorImageUrl: authorFromState.authorImageUrl || ""
            });
        }
    }, [authorFromState]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const authorToSend = {
            ...author,
            authorImageUrl: author.authorImageUrl.trim() === "" ? null : author.authorImageUrl,
            dateOfBirth: author.dateOfBirth.trim() === "" ? null : author.dateOfBirth,
            dateOfDeath: author.dateOfDeath.trim() === "" ? null : author.dateOfDeath
        };

        const method = authorFromState ? 'PUT' : 'POST'; // Use PUT for updating and POST for creating
        const url = authorFromState ? `https://localhost:7110/api/Author/update-author/${authorFromState.authorID}` : 'https://localhost:7110/api/Author/create-author';

        try {
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authorToSend),
            })
                .then(async (response) => {
                    if (response.ok) {
                        console.log("Author processed successfully:", response);
                        alert("Author processed successfully");
                        navigate(`/`);
                    } else {
                        const errorData = await response.text();
                        console.log("Error processing author:", errorData);
                        alert(`${errorData || 'Unknown error occurred'}`);
                    }
                });
        } catch (error) {
            console.error("Error:", error);
            alert(`Request failed: ${error.message}`);
        }
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={author.name} onChange={handleChange} required />
                </label>

                <label>
                    Biography:
                    <textarea name="biography" value={author.biography} onChange={handleChange} required />
                </label>

                <label>
                    Date of Birth:
                    <input type="date" name="dateOfBirth" value={author.dateOfBirth} onChange={handleChange} />
                </label>

                <label>
                    Date of Death:
                    <input type="date" name="dateOfDeath" value={author.dateOfDeath} onChange={handleChange} />
                </label>

                <label>
                    Author Image URL:
                    <input type="text" name="authorImageUrl" value={author.authorImageUrl} onChange={handleChange} />
                </label>

                <button type="submit">{authorFromState ? 'Update Author' : 'Create Author'}</button>
            </form>
        </div>
    );
};

export default CreateOrUpdateAuthorForm;
