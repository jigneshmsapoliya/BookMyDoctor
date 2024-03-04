import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import HomeComponent from './components/HomeComponent'; 
import Services from './components/Services'; 
import FindADoctor from './components/FindADoctor';
import Footer from './components/Footer';
import './index.css';

function Navigation() {
  return (
    <Router>
      <nav>
        <h1 className='logo-text'><a href="/">BookMyDoctor</a></h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/findadoctor">Find a Doctor</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/findadoctor" element={<FindADoctor />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Navigation;
