import {Button, Pagination} from "antd";
import {useEffect, useState} from "react";
import Book from "./ContentElements/Book.jsx";
import "./Content.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Content = () => {
    const [products, setProducts] = useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [productsPerPage]=useState(12);
    const user = useSelector((state) => state.user.user); // Access user data from the Redux store
    const role = user?.role;
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://localhost:7110/api/Book/getAllBooks')
            .then(response => response.json())
            .then(data => {
                setProducts(data.$values || []);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);



    const indexOfLastProduct=currentPage*productsPerPage;
    const indexOfFirstProduct=indexOfLastProduct-productsPerPage;
    const currentProducts=products.slice(indexOfFirstProduct,indexOfLastProduct)

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (bookId) => {
        try {
            const response = await fetch(`https://localhost:7110/api/Book/${bookId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorText = await response.text(); // Handle error response as text
                throw new Error(errorText);
            }

            alert("Book deleted successfully!");
            setProducts((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));
        } catch (error) {
            console.error("Error deleting book:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleAddBookAdmin = () => {
        navigate("/create-book"); // Change to your actual form route
    };


    return (
        <div>
            <div className="ContentPlusNav">
                {user ? (
                    role === 'Admin' && (
                        <>
                            <Button onClick={() => handleAddBookAdmin()}>Add Book Admin</Button>
                        </>
                    )
                ) : null}
                <div className="Content">
                    {currentProducts.map(product => (
                        <div key={product.bookId} className="book-container">
                            <Book
                                bookId={product.bookId}
                                title={product.title}
                                bookImageUrl={product.bookImageUrl}
                                publicationYear={product.publicationYear}
                                author={product.authorId}
                                role={role} // Pass role to Book
                                handleDelete={handleDelete} // Pass delete function to Book
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Pagination defaultCurrent={1} total={products.length} onChange={handlePageChange} align="center" pageSize={productsPerPage}/>
        </div>
    );
    //you need to set the properties of the product when backend ready
}

export default Content;
