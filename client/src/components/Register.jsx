import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import UserContext from "../context/userContext";

function Register() {
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', username: '', password: '', passwordValidate: '', email: '', phone: '', securityQ1: '', securityA1: '', securityQ2: '', securityA2: '', dob: '' });
    const [selectedQ1, setSelectedQ1] = useState('');

    // const { setId } = useContext(UserContext);

    function handleChange(e) {
        let { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value })
        console.log(userInfo.dob);
    }
    function handleQ1Change(e) {
        let { name, value } = e.target;
        setSelectedQ1(value)
        setUserInfo({ ...userInfo, securityQ1: value })
    }
    function handleSubmit(e) {
        e.preventDefault();
        switch (validateData()) {
            case 'firstName':
                console.log('incorrectFirstName');

            default:
                break;
        }
        console.log('dob', userInfo.dob);
        // let res = await fetch(`http://localhost:8080/`)
        // let data = await res.json();
    }
    function validateData() {
        let { firstName, lastName, username, password, passwordValidate, email, phone, securityQ1, securityA1, securityQ2, securityA2 } = userInfo;
        if (firstName === '') {
            return 'firstName';
        }
    }
    let questionOptions = ["What is your favorite food?", "What is your mother's maiden name?", "What is your first pet's name?", "What is your favorite movie?", "What is your favorite hobby?", "What is your childhood nickname?", "What is your favorite book?"];
    const availableOptions = questionOptions.filter(q => q !== selectedQ1);

    return (
        <form onSubmit={handleSubmit}>
            <label>{`First Name: `}
                <input
                    type="text"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>{`Last Name: `}
                <input
                    type="text"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>{`Username: `}
                <input
                    type="text"
                    name="username"
                    value={userInfo.username}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>{`Password: `}
                <input
                    type="password"
                    name="password"
                    value={userInfo.password}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>{`Re-enter Password: `}
                <input
                    type="password"
                    name="passwordValidate"
                    value={userInfo.passwordValidate}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>{`Email: `}
                <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>{`Phone: `}
                <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>{`Security Question 1: `}
                <select name="securityQ1" value={userInfo.securityQ1} onChange={handleQ1Change}>
                    <option value="">Select a Question</option>
                    {questionOptions.map(q => (
                        <option key={q} value={q}>
                            {q}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>{`Answer 1: `}
                <input
                    type="text"
                    name="securityA1"
                    value={userInfo.securityA1}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>{`Security Question 2: `}
                <select name="securityQ2" value={userInfo.securityQ2} onChange={handleChange}>
                    <option value="">Select a Question</option>
                    {availableOptions.map(q => (
                        <option key={q} value={q}>
                            {q}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>{`Answer 2: `}
                <input
                    type="text"
                    name="securityA2"
                    value={userInfo.securityA2}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                <input type="date" name="dob" value={userInfo.dob} onChange={handleChange} />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;