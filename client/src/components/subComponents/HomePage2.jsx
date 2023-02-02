import React, { useState, useEffect } from "react";
import { state } from "../../../../server/DB/con";

function HomePage() {
    
    const [account, setAccount] = useState("");
    
    const [myAccounts, setMyAccounts] = useState([]);
    const [data, setData] = useState([])

    useEffect(() => {
        fetchMyAccounts();
    }, []);

    useEffect(() => {
        postData()
    },[account])
    
    let userId = sessionStorage.getItem("userId");
    async function fetchMyAccounts() {
        const res = await fetch(`http://localhost:8080/accounts/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cookie: document.cookie })
        });
        const data = await res.json();
        setMyAccounts(data);
    };
    async function postData() {
        let res = await fetch(`http://localhost:8080/transactions/${account}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cookie: document.cookie })
        });
        let data = await res.json();
        console.log(data);
        
    }
    function handleChange(e) {
        setAccount({ ...formData, [e.target.name]: e.target.value });
    };

///////////////////////////////
    const [name, setName] = useState({ firstName: "", accountNumber: "" });
    const [actions, setActions] = useState([]);
    useEffect(() => {
        fetchData();
        people();
    }, []);

    async function fetchData() {
        try {
            let response = await fetch(`http://localhost:8080/accounts/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cookie: document.cookie }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch accounts");
            }
            let [data] = await response.json();
            let account = data.account_number;
            setName({ accountNumber: account });
        } catch (error) {
            console.error(error);
        }
    }

    async function people() {
        try {
            let response = await fetch(`http://localhost:8080/people/${userId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch people");
            }
            let [data] = await response.json();
            setActions({ firstName: data.first_name });
        } catch (error) {
            console.error(error);
        }
    }

    const handleAccountNumberChange = async (event) => {
        setName({ ...name, accountNumber: event.target.value });
        try {
            let response = await fetch(`http://localhost:8080/transactions/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: name, cookie: document.cookie }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }
            let data = await response.json();
            setActions(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {actions.firstName !== undefined ? (
                <div>
                    <h1>Hello {actions.firstName}, Welcome Back</h1>
                    <label htmlFor="accountNumber">Select Account Number:</label>
                    <select id="accountNumber" value={account} onChange={fetchMyAccounts}>
                        <option value="">Select Account Number:</option>
                        {/* Add options for each account number */}
                        <option value={name.accountNumber}>{name.accountNumber}</option>
                    </select>

                    <label>
                        choose:
                        <select
                            name="myAccount"
                            value={formData.myAccount}
                            onChange={handleChange}
                        >
                            <option value="">Select an Account</option>

                            {myAccounts && myAccounts.length > 0 &&
                                myAccounts.map(obj => (
                                    <option key={Math.random()} value={obj.account}>{obj.account}</option>
                                ))}
                        </select>
                    </label>

                    {actions.length > 0 ? (
                        <div>
                            <h2>Last Actions:</h2>
                            <ul>
                                {actions.map((action) => (
                                    <li key={action.id}>{action.description}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default HomePage;
