// import React, { useState, useEffect } from "react";

// function HomePage() {
//     const [name, setName] = useState({ firstName: "", accountNumber: "" });
//     const [actions, setActions] = useState([]);
//     useEffect(() => {
//         fetchData();
//         people()
//         console.log(actions);
//     }, []);
//     let userId = sessionStorage.getItem("userId");

//     async function fetchData() {
//         try {
//             let response = await fetch(`http://localhost:8080/accounts/${userId}`,{
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({cookie: document.cookie})});
//             if (!response.ok) {
//                 throw new Error("Failed to fetch accounts");
//             }
//             let [data] = await response.json();
//             let account = data.account_number;
//             setName({ accountNumber: account });
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     async function people() {
//         try {
//             let response = await fetch(`http://localhost:8080/people/${userId}`)
//             if (!response.ok) {
//                 throw new Error("Failed to fetch people");
//             }
//             let [data] = await response.json();
//             setActions({firstName: data.first_name});
//         }
//         catch (error) {
//             console.error(error);
//         }
//     }

//     const handleAccountNumberChange = async (event) => {
//         setName({ ...name, accountNumber: event.target.value });
//         try {
//             let response = await fetch(`http://localhost:8080/transactions/${userId}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ data: name, cookie: document.cookie })
//             });
//             if (!response.ok) {
//                 throw new Error("Failed to fetch transactions");
//             }
//             let data = await response.json();
//             setActions(data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             {actions.firstName !== undefined ? (
//                 <div>
//                     <h1>Hello {actions.firstName}, Welcome Back</h1>
//                     <label htmlFor="accountNumber">Select Account Number:</label>
//                     <select id="accountNumber" value="" onChange={handleAccountNumberChange}>
//                         <option value="">Select Account Number:</option>
//                         <option value={name.accountNumber}>{name.accountNumber}</option>
//                         {/* Add options for each account number */}
//                     </select>
//                     {actions.length > 0 ? (
//                         <div>
//                             <h2>Last Actions:</h2>
//                             <ul>
//                                 {actions.map((action) => (
//                                     <li key={action.id}>{action.description}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ) : (
//                         <div>Loading...</div>
//                     )}
//                 </div>
//             ) : (
//                 <div>Loading...</div>
//             )}
//         </div>
//     );
// }

// export default HomePage;


import React, { useState, useEffect } from "react";

function HomePage() {
    const [name, setName] = useState({ firstName: "", accountNumber: "" });
    const [actions, setActions] = useState([]);
    useEffect(() => {
        fetchData();
        people();
    }, []);
    let userId = sessionStorage.getItem("userId");

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
                    <select id="accountNumber" value="" onChange={handleAccountNumberChange}>
                        <option value="">Select Account Number:</option>
                        {/* Add options for each account number */}
                        <option value={name.accountNumber}>{name.accountNumber}</option>
                    </select>
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
