// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      <Footer />
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
