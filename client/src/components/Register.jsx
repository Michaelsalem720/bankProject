import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

function Register() {
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', username: '', password: '', password2: '', email: '', phone: '', q1: '', a1: '', q2: '', a2: '', dob: '' });
    const [selectedQ1, setSelectedQ1] = useState('');
    const navigate = useNavigate();
    // const { setId } = useContext(UserContext);

    function handleChange(e) {
        let { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value })
        console.log(userInfo.dob);
    }
    function handleQ1Change(e) {
        let { name, value } = e.target;
        setSelectedQ1(value)
        setUserInfo({ ...userInfo, q1: value })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        switch (validateData()) {
            case 'firstName':
                return ('incorrectFirstName');

            default:
                break;
        }
        // console.log(new Date(userInfo.dob) < new Date());
        console.log(userInfo);
        let res = await fetch(`http://localhost:8080/people`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        let data = await res.json();
        console.log(data);
        navigate('/login');
    }
    function validateData() {
        let { firstName, lastName, username, password, password2, email, phone, q1, a1, q2, a2 } = userInfo;
        if (firstName === '') {
            return 'firstName';
        }
    }
    let questionOptions = ["What is your favorite food?", "What is your mothers maiden name?", "What is your first pets name?", "What is your favorite movie?", "What is your favorite hobby?", "What is your childhood nickname?", "What is your favorite book?"];
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
                    name="password2"
                    value={userInfo.password2}
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
                <select name="q1" value={userInfo.q1} onChange={handleQ1Change}>
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
                    name="a1"
                    value={userInfo.a1}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>{`Security Question 2: `}
                <select name="q2" value={userInfo.q2} onChange={handleChange}>
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
                    name="a2"
                    value={userInfo.a2}
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