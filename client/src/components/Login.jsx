import React, { useContext, useState } from "react";
import UserContext from "../context/userContext";
import Home from "./Home";
// function Login() {
//     return (
//         <div>
//             <h1>Login</h1>
//         </div>
//     )
// }


function Login() {

    const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

    const { setId } = useContext(UserContext);

    function handleChange(e) {
        let { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
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
            <Home />
        </form>
    );
}




export default Login;