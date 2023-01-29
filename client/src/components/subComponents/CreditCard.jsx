import React from "react";

function CreditCard() {
    function hello(e) {
        e.preventDefault();
        console.log('hello');
    }

    return (
        <div>
            <h1>CreditCard</h1>
            <form onSubmit={hello}>
                <button>submit</button>
            </form>
        </div>
    )
}


export default CreditCard;