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

    async function handleSubmit(e) {
        e.preventDefault();
        if (loginInfo.username === "eyal" && loginInfo.password === "1234") {
            navigate('/home')
        }
        // let res = await fetch(`http://localhost:8080/`)
        // let data = await res.json();
    }

    return (
        <form onSubmit={handleSubmit}>
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
    );
}




export default Login;