import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';



function Navigation() {
  return (

    <nav>


      <h1 className='logo-text'>BookMyDoctor</h1>

      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>
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
      <Route path="/home" element={<Home />} />
    </Routes>
  </div>
</Router>
  );
}

export default App;

