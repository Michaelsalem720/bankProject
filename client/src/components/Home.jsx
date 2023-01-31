import React, { useContext, useEffect } from "react";
import Navigation from "./Navigation";
import CreditCard from "./subComponents/CreditCard";
import DepositChecks from "./subComponents/DepositChecks";
import DownloadStatements from "./subComponents/DownloadStatements";
import MoveMoney from "./subComponents/MoveMoney";
import Chat from "./subComponents/Chat";
import SecSettings from "./subComponents/SecSettings";
import UserContext from "../context/userContext";

function Home() {
    const { id } = useContext(UserContext);
    // useEffect(()=>{
    //     console.log(id);
    // },[id])
    return (
        <div>{`id: ${id}`}
            <Navigation />
            <MoveMoney />
            <CreditCard />
            <DepositChecks />
            <DownloadStatements />
            <Chat />
            <SecSettings />
        </div>
    )
}


export default Home;