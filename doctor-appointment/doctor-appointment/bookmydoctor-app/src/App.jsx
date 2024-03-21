import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"

function Navigation() {
  return (

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Care App</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">

          <Link className='nav-link' to="/register">Register</Link>

          <Link className='nav-link' to="/login">Login</Link>

       
      </div>
    </div>
  </div>
</nav>

    
 
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
    </Routes>
  </div>
</Router>
  );
}

export default App;

