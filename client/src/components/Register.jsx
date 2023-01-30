import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import UserContext from "../context/userContext";

function Register() {
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', username: '', password: '', passwordValidate: '', email: '', phone: '', securityQ1: '', securityA1: '', securityQ2: '', securityA2: '' });

    // const { setId } = useContext(UserContext);

    function handleChange(e) {
        let { name, value } = e.target;
        setUserInfo({ ...registrationInfo, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('hello');
        // let res = await fetch(`http://localhost:8080/`)
        // let data = await res.json();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label> First Name:
                <input
                    type="text"
                    name="firstName"
                    value={registrationInfo.firstName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={registrationInfo.lastName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={registrationInfo.username}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={registrationInfo.password}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Confirm Password:
                <input
                    type="password"
                    name="passwordValidate"
                    value={registrationInfo.passwordValidate}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={registrationInfo.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Phone Number:
                <input
                    type="tel"
                    name="phone"
                    value={registrationInfo.phone}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Security Question 1:
                <input
                    type="text"
                    name="securityQ1"
                    value={registrationInfo.securityQ1}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Security Answer 1:
                <input
                    type="text"
                    name="securityA1"
                    value={registrationInfo.securityA1}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Security Question 2:
                <input
                    type="text"
                    name="securityQ2"
                    value={registrationInfo.securityQ2}
                />
            </label>
            <br />
            <label>
                Security Answer 2:
                <input
                    type="text"
                    name="securityA2"
                    value={registrationInfo.securityA2}
                    onChange={handleChange}
                />
            </label>
            <br />
        </form>
    );
};

export default Register;
