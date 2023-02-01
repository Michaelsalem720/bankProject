
// import React, { useState, useEffect } from "react";

// function BankActionsAndStatements({ data }) {
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [actions, setActions] = useState([]);
//     const [statements, setStatements] = useState([]);

//     let userId = sessionStorage.getItem("userId");

//     useEffect(() => {
//         fetchUserTransactions();
//     }, []);

//     const fetchUserTransactions = async () => {
//         const response = await fetch(`http://localhost:8080/transactions/${userId}`);
//         const transactions = await response.json();
//         setActions(transactions.actions);
//         setStatements(transactions.statements);
//     };

//     function handleDateChange(e) {
//         const date = e.target.value;
//         setSelectedDate(date);

//         const filteredActions = actions.filter((action) => action.date === date);
//         setActions(filteredActions);

//         const filteredStatements = statements.filter((statement) => statement.date === date);
//         setStatements(filteredStatements);
//     }
//     function hello(e) {
//         e.preventDefault();
//         console.log('hello');
//     }

//     return (
//         <div>
//             <h1>Bank Actions and Statements</h1>
//             <select onChange={handleDateChange}>
//                 <option value="">-- Select Date --</option>
//                 {Array.from(new Set(actions.map((action) => action.date))).map((date) => (
//                     <option key={date} value={date}>
//                         {new Date(date).toLocaleDateString()}
//                     </option>
//                 ))}
//             </select>
//             {selectedDate && (
//                 <div>
//                     <h2>Actions</h2>
//                     <ul>
//                         {actions && actions.length > 0 && actions.map((action) => (
//                             <li key={action.id}>
//                                 {action.text} ({action.amount})
//                             </li>
//                         ))}
//                     </ul>
//                     <h2>Statements</h2>
//                     <ul>
//                         {statements.map((statement) => (
//                             <li key={statement.id}>{statement.text}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//             <div>
//                 <form onSubmit={hello}>
//                     <button type="submit">submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default BankActionsAndStatements;

import React, { useState } from 'react';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentYear = new Date().getFullYear();
let years = []
for (let i = 0; i < 10; i++) {
    years.push(currentYear - i);
}

const BankActionsAndStatements = () => {
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(0);

    return (
        <div>
            <h1>Bank Actions and Statements</h1>
            <select onChange={e => setSelectedMonth(e.target.value)}>
                {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                ))}
            </select>
            <select onChange={e => setSelectedYear(e.target.value)}>
                {years.map((year, i) => (
                    <option key={i} value={i}>{year}</option>
                ))}
            </select>
            <p>{`Selected date: ${months[selectedMonth]}-${years[selectedYear]}`}</p>
        </div>
    );
};

export default BankActionsAndStatements;








