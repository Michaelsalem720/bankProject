import { Link, Route, Routes, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
// import UserId from "./context/UserId";
import UserContext from "./context/userContext";
import './App.css';
import './Navbar.css';

function App() {
  const [id, setId] = useState();
  const contextValue = { id, setId };
  
  return (
    <div>
      <UserContext.Provider value={contextValue}>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Routes>
        <Footer />
        </UserContext.Provider>
    </div>
  );
}

export default App;


