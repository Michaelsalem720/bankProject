import React, { useContext } from "react";

// function Login() {
//     return (
//         <div>
//             <h1>Login</h1>
//         </div>
//     )
// }


function Login() {
    const { setUserId } = useContext(UserContext);
    
    const handleLogin = (id) => {
      setUserId(id);
    };
  
    return (
        <div>
        <button onClick={() => handleLogin(1)}>Login as User 1</button>
        <button onClick={() => handleLogin(2)}>Login as User 2</button>
      </div>
    );
}

export default Login;