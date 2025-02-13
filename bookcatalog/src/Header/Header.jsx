import {useDispatch, useSelector} from 'react-redux'; // Use useSelector to access the Redux store
import { Link } from 'react-router-dom'; // For navigation between pages
import './Header.css';
import {clearUser} from "../userSlice.js"; // Assume you have styles for your header

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user); // Access user data from the Redux store
    const role = user?.role;


    function handleLogOut()
    {
        if(window.confirm("Are you sure you want ot log out?"))
        dispatch(clearUser());
    }
    return (
        <div className="header">
            <div className="logo">
                <Link to="/"><h1>Book Catalogue</h1></Link>
            </div>

            <div>
                {user ? (
                    role === 'Admin' && (
                        <>
                        <Link to="/authorAdminConsole">
                            <div>Author Admin Console</div>
                        </Link>
                        <Link to="/genreAdminConsole">
                        <div>Genre Admin Console</div>
                         </Link>
                        </>
                    )
                ) : null}
            </div>


            <nav className="nav">
                {user ? (
                    <>
                        <div className="profile">
                            <img
                                src={user.profilePicUrl || 'default-profile.png'} // Default image if no profilePicUrl
                                alt="Profile"
                                className="profile-pic"
                            />
                            <div className="user-info">
                                <span>{user.username}</span>
                                <span>{user.email}</span>
                            </div>
                            <div style={{ cursor: 'pointer' }} onClick={handleLogOut}>Log out</div>
                        </div>
                    </>
                ) : (
                    // If user is not logged in, show login and signup buttons
                    <div className="auth-buttons">
                        <Link to="/login" className="auth-btn">Log In</Link>
                        <Link to="/signUp" className="auth-btn">Sign Up</Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;
