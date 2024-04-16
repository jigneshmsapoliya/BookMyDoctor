import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import HomeComponent from './components/HomeComponent';
import Services from './components/Services';
import FindADoctor from './components/FindADoctor';
import DoctorDetails from './components/DoctorDetails';
import Footer from './components/Footer';
import BookAppointment from './components/BookAppointment';

// Admin imports
import AdminDashboard from './components/AdminDashboard';
import AddDoctor from './components/AddDoctor';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import AppointmentForm from './components/AppointmentForm';
import TimeSlotForm from './components/TimeSlotForm ';


function Navigation() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    // Check if user data exists in sessionStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null); // Clear user information
  };
  

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
          
          {user ? (
            
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <i className="fas fa-user"></i> {user.name}
                  {console.log(user.role)}
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
           
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          )}
        </div>
      </nav>


      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/findadoctor" element={<FindADoctor />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />

       
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path='/admin/addDoctor' element={<AddDoctor />} />
        <Route path='/admin/timeslot' element={<TimeSlotForm />} />
        <Route path='/book-appointment/:doctorId' element={<AppointmentForm />} />
        <Route path="/book-appointment/:id" element={<BookAppointment />} />
      </Routes>
      <Footer />
      <ToastNotification />
    </Router>
  );
}

function ToastNotification() {
  const location = useLocation();

  // Display toast message upon successful login
  React.useEffect(() => {
    if (location.state && location.state.from === '/login') {
      toast.success("Login Successful!", {
        position: "bottom-right"
      });
    }
  }, [location.state]);

  return <ToastContainer />;
}


export default Navigation;
