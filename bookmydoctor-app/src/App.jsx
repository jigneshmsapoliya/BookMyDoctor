import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import HomeComponent from './components/HomeComponent'; 
import Services from './components/Services'; 
import FindADoctor from './components/FindADoctor';
import DoctorDetails from './components/DoctorDetails';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

function Navigation() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#37DAE5' }}>
  <a className="navbar-brand" href="/">BookMyDoctor</a>
  
  <ul className="navbar-nav mx-auto">
    <li className="nav-item">
      <a className="nav-link" href="/">Home</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/services">Services</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/findadoctor">Find a Doctor</a>
    </li>
    
  </ul>
  <div className="navbar-nav ml-auto ml-3">
    <li className="nav-item">
      <a className="nav-link" href="/register">Register</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/login">Login</a>
    </li>
  </div>
</nav>

      
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/findadoctor" element={<FindADoctor />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Navigation;
