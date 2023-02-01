import React, { useState, useEffect } from "react";

function MoveMoney() {

    const [formData, setFormData] = useState({
        credit: "",
        debit: "",
        myAccount: "",
        date: "",
        foreignAccount: "",
        routingNumber: "",
        checkNumber: ""
    });

    const [myAccounts, setMyAccounts] = useState([]);
    useEffect(() => {
        fetchMyAccounts();
    }, []);

    let userId = sessionStorage.getItem("userId");

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        postData();
    };

    async function fetchMyAccounts() {
        console.log('hello world');
        const res = await fetch(`http://localhost:8080/accounts/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cookie: document.cookie })
        });
        const data = await res.json();
        setMyAccounts(data);
    };

    async function postData() {
        let res = await fetch(`http://localhost:8080/transactions/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: formData, cookie: document.cookie })
        });
        let data = await res.json();
        alert(data.message);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Send Wire</h2>
                <div>
                    <label>
                        Account Number:
                        <input
                            type="text"
                            name="foreignAccount"
                            value={formData.foreignAccount}
                            onChange={handleChange}
                            maxLength='9'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Routing Number:
                        <input
                            type="text"
                            name="routingNumber"
                            value={formData.routingNumber}
                            onChange={handleChange}
                            maxLength='9'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Amount:
                        <input
                            type="text"
                            name="debit"
                            value={formData.debit}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Send From:
                        <select
                            name="myAccount"
                            value={formData.myAccount}
                            onChange={handleChange}
                        >
                            <option value="">Account #</option>

                            {myAccounts && myAccounts.length > 0 &&
                                myAccounts.map(obj => (
                                    <option key={obj.account} value={obj.account}>{obj.account}</option>
                                ))}
                        </select>
                    </label>
                </div>
                <button type="submit">Send Wire</button>
            </form>
        </>
    );
};

export default MoveMoney;
