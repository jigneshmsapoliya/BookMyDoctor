import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import './home.css';
import './App.css'

function Navigation() {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">BookMyDoctor</a>
                    <div className="navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-home"></i> <Link to="/">Home</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-user-md"></i> Find a Doctor</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-medkit"></i> Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-info-circle"></i> About Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="login-register">
                        <a href="#"><i className="fas fa-sign-in-alt"></i> <Link to="/login">Login</Link></a>
                        <a href="#"><i className="fas fa-user-plus"></i>  <Link to="/register">Register</Link></a>
                    </div>
                </div>
            </nav>

    // <nav>


    //   <h1 className='logo-text'>BookMyDoctor</h1>

    //   <ul>
    //     <li>
    //       <Link to="/register">Register</Link>
    //     </li>
    //     <li>
    //       <Link to="/login">Login</Link>
    //     </li>
    //     <li>
    //       <Link to="/home">Home</Link>
    //     </li>
    //   </ul>
    // </nav>
  );
}

function App() {
  return (
    <Router>
  <div>
    <Navigation />

    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
</Router>
  );
}

export default App;

