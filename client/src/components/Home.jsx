import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import MoveMoney from "./subComponents/MoveMoney";
// import {  } from "react";

function Home() {
    return (
        <div>
            <Navigation/>
            <h1>Home</h1>
            <MoveMoney/>
        </div>
    )
}


export default Home;