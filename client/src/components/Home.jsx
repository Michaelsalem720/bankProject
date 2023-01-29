import React from "react";
import Navigation from "./Navigation";
import MoveMoney from "./subComponents/MoveMoney";
import SecSettings from "./subComponents/SecSettings";

function Home() {
    return (
        <div>
            <Navigation/>
            <h1>Home</h1>
            <MoveMoney/>
            <SecSettings />
        </div>
    )
}


export default Home;