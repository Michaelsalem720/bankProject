import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Chat from "./subComponents/Chat";
import CreditCard from "./subComponents/CreditCard";
import DepositChecks from "./subComponents/DepositChecks";
import BankActionsAndStatements from "./subComponents/DownloadStatements";
import MoveMoney from "./subComponents/MoveMoney";
import Settings from "./subComponents/SecSettings";
import HomePage from "./subComponents/HomePage";

function Navigation() {

    const navigate = useNavigate();
    const [show, setShow] = useState('home');

    function handleClick(e) {
        if (e.target.id === 'logout') {
            logout();
        }
        setShow(e.target.id);
    }

    function logout() {
        sessionStorage.clear();
        navigate('/login', { replace: true });
        
    }

    return (
        <div>
            <nav onClick={handleClick} className="navbar">
                <div id='home'>Home Page</div>
                <div id='check'>Deposit Check</div>
                <div id='creditCard'>Credit Card</div>
                <div id='move'>Move Money</div>
                <div id='statements'>Download Statements</div>
                <div id='settings'>Settings</div>
                <div id='chat'>Chat</div>
                <div id='logout'>Log out</div>
            </nav>
            <div>
                {show === 'home' && <HomePage />}
                {show === 'check' && <DepositChecks />}
                {show === 'move' && <MoveMoney />}
                {show === 'creditCard' && <CreditCard />}
                {show === 'statements' && <BankActionsAndStatements />}
                {show === 'settings' && <Settings />}
                {show === 'chat' && <Chat />}
            </div>
        </div>
    )
}



export default Navigation;