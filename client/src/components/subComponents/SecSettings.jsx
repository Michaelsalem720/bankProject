import React, { useContext, useState } from "react";
import UserContext from "../../context/userContext";


function Settings() {
    const [description, setDescription] = useState();
    const [info, setInfo] = useState('');

    const {id} = useContext(UserContext)
    let userId = JSON.parse(sessionStorage.getItem('userId'))
    function hello(e) {
        e.preventDefault();
        setDescription(e.target.id);
        console.log(e.target.id);
    }
    function handleChange(e){
        setInfo(e.target.value);
        console.log(e.target.value);
    }
    function updateValue(e) {
        console.log(userId);
        e.preventDefault();
        fetch(`http://127.0.0.1:8080/people/${userId}`, {//need to change back to ${id}
            credentials: 'include',
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description,
                info
            })
        })
            .then(res => res.json())
            .then(data => { console.log(`${description} changed`) })
    }


    function deletePerson(e) {
        e.preventDefault();
        fetch(`http://localhost:8080/people/${userId}`, {//need to change back to ${id}
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
          .then(res => res.json())
          .then(data => { console.log(`user ${userId} deleted`) })//need to change back to ${id}
    }
    return (
        <div>
            <h1>Settings:</h1>
            <form onSubmit={updateValue}>
                <p id="username" onClick={hello}>change username</p>
                <p id="password" onClick={hello}>change password</p>
                <p id="email" onClick={hello}>change email</p>
                <p id="phone" onClick={hello}>change phone-number</p>
                <input onChange={handleChange} value={info} type="text" placeholder={description} />
                <button>submit</button>
            </form>
            <button onClick={deletePerson}>delete account</button>
        </div>
    )
}


export default Settings;