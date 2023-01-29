// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { useState } from 'react';

function App() {
  const [userId, setUserId] = useState(null);
  const contextValue = { userId, setUserId };
  const UserContext = React.createContext({
    userId: null,
    setUserId: () => {}
  });
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

// <Header />
// <Routes>
//   <Route path='/' >
//     <Route index element={<Home/>} />
//     <Route path='login' element={<Login />} />
//     <Route path='about' element={<About />} />
//     <Route path='*' element={<Page404 />} />
//   </Route>
// </Routes>
// <Footer />
