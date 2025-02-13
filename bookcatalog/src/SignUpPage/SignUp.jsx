import React, {useState} from "react";

import {useNavigate} from "react-router-dom";
import {Button} from "antd";

const SignUp = () =>
{
    const navigate = useNavigate()
    const[username,setUsername]=useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSignUp = () =>
    {


        fetch('https://localhost:7110/api/User/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: username,
                Email: email,
                Password: password,
                Role: "User"

            })
        })
            .then(response => {
                if (response.ok) {
                    navigate(`/login`);
                } else {
                    alert("Signup failed. Idk where");
                }
            })
            .catch(error => console.error('Error:', error));

    }
    return(
        <div className="container">
            <h2>Sign Up</h2>
            <form action="/register" method="POST">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input onChange={handleUsernameChange} type="text" id="username" name="username" placeholder="Your username"
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={handlePasswordChange} type="text" id="password" name="password"
                           placeholder="Choose a password" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={handleEmailChange} type="text" id="email" name="email"
                           placeholder="Enter your email address" required/>
                </div>
                <Button type="primary" onClick={handleSignUp} block={true}
                        style={{backgroundColor: '#28a745'}}>SignUp</Button>
            </form>

        </div>
    );
}
export default SignUp