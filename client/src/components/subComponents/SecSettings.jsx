import React, { useState } from "react";


function Settings() {
    const [description, setDescription] = useState();
    const [info, setInfo] = useState('');

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
        e.preventDefault();
        // fetch(`http://localhost:8080/people/${id}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         description,
        //         info
        //     })
        // })
        //     .then(res => res.json())
        //     .then(data => { console.log(`${description} changed`) })
    }

    function deletePerson(e) {
        e.preventDefault();
        // fetch(`http://localhost:8080/people/${id}`, {
        //     method: "DELETE",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //   .then(res => res.json())
        //   .then(data => { console.log(`user ${id} deleted`) })
    }
    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={updateValue}>
                <p id="name" onClick={hello}>change name</p>
                <p id="password" onClick={hello}>change password</p>
                <p id="email" onClick={hello}>change email</p>
                <p id="phone-number" onClick={hello}>change phone-number</p>
                <input onChange={handleChange} value={info} type="text" placeholder={description} />
                <button>submit</button>
            </form>
            <button onClick={deletePerson}>delete account</button>
        </div>
    )
}


export default Settings;