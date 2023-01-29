import { Link, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UserId from "./context/UserId";


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


