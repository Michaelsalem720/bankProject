import React, { useState, useEffect } from "react";

function DepositChecks() {

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
    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:8080/transactions/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: formData, cookie: document.cookie })
        });
        const data = await res.json();
        console.log(data);
        alert(data.message);
        // console.log(`you now have ${data.amount} in your account`);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Check Number:
                        <input
                            type="text"
                            name="checkNumber"
                            value={formData.checkNumber}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Amount:
                        <input
                            type="text"
                            name="credit"
                            value={formData.credit}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Deposit Into:
                        <select
                            name="toAccount"
                            value={formData.toAccount}
                            onChange={handleChange}
                        >
                            <option value="">Select an Account</option>

                            {myAccounts && myAccounts.length > 0 &&
                                myAccounts.map(obj => (
                                    <option key={obj.account} value={obj.account}>
                                        {obj.account}
                                    </option>
                                ))}
                        </select>
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
                        Account Number:
                        <input
                            type="text"
                            name="foreignAccount"
                            value={formData.foreignAccount}
                            onChange={handleChange}
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
                            maxLength ='9'
                        />
                    </label>
                </div>
                <button type="submit">Deposit Check</button>
            </form>
        </>
    );
};

export default DepositChecks;
