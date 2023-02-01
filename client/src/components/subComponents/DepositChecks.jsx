import React, { useState, useEffect } from "react";

function DepositChecks() {

    const [formData, setFormData] = useState({
        checkNumber: "",
        amount: "",
        depositInto: "",
        date: "",
        accountNumber: "",
        routingNumber: ""
    });

    const [userAccountNumbers, setUserAccountNumbers] = useState([]);

    let userId = sessionStorage.getItem("userId");

    useEffect(() => {
        fetchUserAccountNumbers();
        console.log('fetch account numbers');
    }, []);

    async function fetchUserAccountNumbers() {
        console.log('hello world');
        const res = await fetch(`http://localhost:8080/accounts/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cookie: document.cookie })
        });
        const data = await res.json();
        console.log('data: ', data);
        setUserAccountNumbers(data);
    };
    const handleInputChange = event => {
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
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Amount:
                        <input
                            type="text"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Deposit Into:
                        <select
                            name="depositInto"
                            value={formData.depositInto}
                            onChange={handleInputChange}
                        >
                            <option value="">Select an Account Number</option>

                            {userAccountNumbers && userAccountNumbers.length > 0 &&
                                userAccountNumbers.map(obj => (
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
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Account Number:
                        <input
                            type="text"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
