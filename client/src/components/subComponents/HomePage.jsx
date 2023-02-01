import React, { useState, useEffect } from "react";

function HomePage() {
    const [name, setName] = useState({ first_name: "" });
    let userId = sessionStorage.getItem("userId");
    useEffect(() => {
        async function fetchData() {
            let response = await fetch(`http://localhost:8080/people/${userId}`);
            let [data] = await response.json();
            setName({ first_name: data.first_name });
        }
        fetchData();
    }, []);

    return (
        <div>{name.first_name !== undefined ? "Hello" + " " + name.first_name + " " + "Welcome Back" : "Loading..."}</div>
    );
}

export default HomePage;
