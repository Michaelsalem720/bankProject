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
        let token = createCookie()
        try {
            const response = await fetch("http://localhost:8080/people", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({data:loginInfo,cookie:token})
            });
            const data = await response.json();
            if (data.msg) {
                sessionStorage.setItem("userId", data.id);
                setId(data.id)
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

    function createCookie() {
        let date = new Date();
        date.setTime(date.getTime() + (1 * 60 * 60 * 1000));
        let expires = date.toUTCString();
        let token = Math.random().toString().substring(2, 15)
        let cookie = `token=${token}; expires=${expires}; path=${"/home"}`;
        document.cookie = cookie;
        return token
    }

    return (
        <>
            <h1 className="title_h1">Login</h1>
            <main className="login-page">
                <form id="form_login" onSubmit={login}>
                    <div>
                        <label className="label" htmlFor="username">{'Username: '}
                            <input className="form-input" type="text" name="username" value={loginInfo.username} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label id="lab" className="label" htmlFor="password">{'Password: '}
                            <input className="form-input" type="text" name="password" value={loginInfo.password} onChange={handleChange} />
                        </label>
                    </div>
                    <button className="form-submit" type="submit">Login</button>
            <button className="form-submit" onClick={handleRegister}>Register</button>
                </form>
            </main>
        </>
    );
}




export default Login;