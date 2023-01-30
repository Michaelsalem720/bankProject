import React from "react";

function MoveMoney() {
    function hello(e) {
        e.preventDefault();
        console.log('hello');
    }

    return (
        <div>
            <h1>MoveMoney</h1>
            <form onSubmit={hello}>
                <button>submit</button>
            </form>
        </div>
    )
}


export default MoveMoney;