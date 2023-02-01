import React, { useContext, useState } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Home from "./Home";


function Login() {

    const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const { setId } = useContext(UserContext);

    function handleChange(e) {
        let { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    async function login(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            });
            const data = await response.json();
            if (data[0].id) {
                console.log(data[0].id);
                sessionStorage.setItem("userId", data[0].id);
                setId(data[0].id)
                navigate('/home')
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleRegister() {
        navigate('/register')
    }

    return (
        <>
            <form onSubmit={login}>
                <div>
                    <label htmlFor="username">{'Username: '}
                        <input type="text" name="username" value={loginInfo.username} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">{'Password: '}
                        <input type="text" name="password" value={loginInfo.password} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
            <button onClick={handleRegister}>Register</button>
        </>
    );
}




export default Login;