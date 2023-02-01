import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

function Register() {

    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', username: '', password: '', password2: '', email: '', phone: '', q1: '', a1: '', q2: '', a2: '', dob: '' });
    const [selectedQ1, setSelectedQ1] = useState('');
    const [dataMsg, setDataMsg] = useState(validateData());

    useEffect(() => {
        setDataMsg(validateData());
    }, [userInfo])
    const navigate = useNavigate();
    // const { setId } = useContext(UserContext);

    let questionOptions = ["What is your favorite food?", "What is your mothers maiden name?", "What is your first pets name?", "What is your favorite movie?", "What is your favorite hobby?", "What is your childhood nickname?", "What is your favorite book?"];
    let availableOptions = questionOptions.filter(q => q !== selectedQ1);

    function handleChange(e) {
        let { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value })
    }

    function handleQ1Change(e) {
        let { name, value } = e.target;
        setSelectedQ1(value)
        setUserInfo({ ...userInfo, q1: value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        switch (validateData()) {
            case false:
                postData();
                break;
                default:
                alert(dataMsg);
                return
        }
    }

    async function postData() {
        try {
            let res = await fetch(`http://localhost:8080/people`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            })
            let data = await res.json();
            console.log(data);
            navigate('/login');
        }
        catch (err) {
            console.log('hi3');
            console.log('error: ', err);
        }
    }

    function validateData() {
        let { firstName, lastName, username, password, password2, email, phone, q1, a1, q2, a2, dob } = userInfo;
        if (!firstName || !lastName || !username || !password || !password2 || !email || !phone || !q1 || !a1 || !q2 || !a2 || !dob) return `Please fill in all fields`;
        else if (password !== password2) return 'passwords do not match';
        else if (!/^\w+@[a-z]+\.[a-z]{2,}$/i.test(email)) return 'please enter a valid email';
        else if (!/^\d{10}$/.test(phone)) return 'please enter a valid phone number';
        else if (new Date(dob) > new Date()) return 'please enter a valid date of birth';
        else if (new Date(dob) >= new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())) return `sorry, please come back in ${18 - new Date().getFullYear() + new Date(dob).getFullYear()} year/s`;
        else return false;
    }
    return (
        <>

            <h1 className="title_h1">Register</h1>
            <main className="register_page">
                <form id="register_form" onSubmit={handleSubmit}>
                    <label className="lab_login">{`First Name: `}
                        <input className="form-input"
                            type="text"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="lab_login">{`Last Name: `}
                        <input className="form-input"
                            type="text"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="lab_login">{`Username: `}
                        <input className="form-input"
                            type="text"
                            name="username"
                            value={userInfo.username}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="lab_login">{`Password: `}
                        <input className="form-input"
                            type="password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label id="input_pass">{`Re-enter Password: `}
                        <input className="form-input"
                            type="password"
                            name="password2"
                            value={userInfo.password2}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label id="email_input" className="lab_login">{`Email: `}
                        <input className="form-input"
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label id="phone_input" className="lab_login">{`Phone: `}
                        <input className="form-input"
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
                    <label className="lab_login">{`Answer 1: `}
                        <input className="form-input"
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
                    <label className="lab_login">{`Answer 2: `}
                        <input className="form-input"
                            type="text"
                            name="a2"
                            value={userInfo.a2}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="lab_login">{`Date of birth:`}
                        <input type="date" name="dob" value={userInfo.dob} onChange={handleChange} />
                    </label><br></br>
                    <div id="msg">{dataMsg || `Great job ${userInfo.firstName}, you're ready to submit!`}</div>
                    <button className="form-submit" type="submit">Register</button>
                </form>
            </main>
        </>
    );
};

export default Register;