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
    // sessionStorage.setItem('userId',35)
    let userId = sessionStorage.getItem('userId');
    // async function testFetch(){
    //     let res = await fetch(`http://localhost:8080/test/${userId}`,{
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     });
    //     let data = await res.json();
    //     console.log(data);
    // }
    // useEffect(()=>{
    //     console.log(id);
    // },[id])
    return (
        <div>{`id: ${userId}`}
        {/* <button onClick={testFetch}>testFetch</button> */}
            <Navigation />
            {/* <MoveMoney /> */}
            {/* <CreditCard /> */}
            <DepositChecks />
            {/* <DownloadStatements /> */}
            {/* <Chat /> */}
            <SecSettings />
        </div>
    )
}


export default Home;