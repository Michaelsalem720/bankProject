import React from "react";

function DepositChecks() {
    function hello() {
        console.log('hello');
    }

    return (
        <div>
            <h1>DepositChecks</h1>
            <form onSubmit={hello}>
                <button>submit</button>
            </form>
        </div>
    )
}


export default DepositChecks;