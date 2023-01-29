import React from "react";
import ReactDOM from "react-dom";
import Navigation from "../Navigation";
// import {  } from "react";

function MoveMoney() {
    function hello() {
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