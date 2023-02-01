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
        let token = createCookie('token')
        try {
            const response = await fetch("http://localhost:8080/people", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({data:loginInfo,token:token})
            });
            const data = await response.json();
            console.log(data);
            if (data) {
                sessionStorage.setItem("userId", data);
                setId(data);
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

    function createCookie(name) {
        let date = new Date();
        date.setTime(date.getTime() + (1 * 60 * 60 * 1000));
        let expires = date.toUTCString();
        let token = Math.random() * Math.pow(10, 17).toString()
        let cookie = `${name}=${token}; expires=${expires}; path=${("/home")}`;
        document.cookie = cookie;
        return token
    }

    return (
        <>
            <header id="main-header">
                <h1 className="header-title">My Bank</h1>
            </header>
            <main className="login-page">
                <form onSubmit={login}>
                    <div>
                        <label htmlFor="username">{'Username: '}
                            <input className="form-input" type="text" name="username" value={loginInfo.username} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="password">{'Password: '}
                            <input className="form-input" type="text" name="password" value={loginInfo.password} onChange={handleChange} />
                        </label>
                    </div>
                    <button className="form-submit" type="submit">Login</button>
            <button className="form-submit" onClick={handleRegister}>Register</button>
                </form>
            </main>
            <footer>
                Copyright © My Bank 2023
            </footer>
        </>
    );
}




export default Login;