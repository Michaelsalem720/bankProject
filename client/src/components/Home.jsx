import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import CreditCard from "./subComponents/CreditCard";
import DepositChecks from "./subComponents/DepositChecks";
import DownloadStatements from "./subComponents/DownloadStatements";
import MoveMoney from "./subComponents/MoveMoney";
import Chat from "./subComponents/Chat";
// import {  } from "react";

function Home() {
    return (
        <div>
            <Navigation />
            <h1>Home</h1>
            <MoveMoney />
            <CreditCard />
            <DepositChecks />
            <DownloadStatements />
            <Chat/>
        </div>
    )
}


export default Home;