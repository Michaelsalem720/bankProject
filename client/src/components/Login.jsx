import React, { useContext } from "react";
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
    const { setId } = useContext(UserContext);

    const handleLogin = (e,id) => {
        e.preventDefault();
        setId(id);
        console.log(id);
    };
    // function handleLogin(e,id) {
    //     e.preventDefault();
    //     setId(id)
    //     console.log(id);
    // }
    return (
        <div>
            <button onClick={(e) => handleLogin(e,1)}>Login as User 1</button>
            <button onClick={(e) => handleLogin(e,2)}>Login as User 2</button>
            <Home />
        </div>
    );
}

export default Login;