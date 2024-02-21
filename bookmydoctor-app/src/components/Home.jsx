import React from 'react';
import { useQuery,gql } from '@apollo/client';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../home.css'; // Import your CSS file

const GET_DOCTORS = gql`
  query {
    doctors {
      _id
      firstName
      lastName
      specialization
    }
  }
`;


function Home() {
    const{loading, error, data} = useQuery(GET_DOCTORS) 
    //console.log(data);
    const toggleAnswer = (id) => {
        const answer = document.getElementById('faq-answer-' + id);
        const toggleIcon = document.querySelector('.faq-question[data-id="' + id + '"] .faq-toggle');
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            toggleIcon.textContent = '+';
        } else {
            answer.style.display = 'block';
            toggleIcon.textContent = '-'; 
        }
    };

    return (
        <div>
            {/* Navigation Bar */}
            {/* <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">BookMyDoctor</a>
                    <div className="navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-home"></i> Home</a>
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
                        <a href="#"><i className="fas fa-sign-in-alt"></i> Login</a>
                        <a href="#"><i className="fas fa-user-plus"></i>  Register</a>
                    </div>
                </div>
            </nav> */}

            {/* Banner Section */}
            <div className="banner">
                <div className="banner-content">
                    <h1>Get A Consultation From Your Best Doctor</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <a href="#" className="btn btn-success">Book Now</a>
                </div>
                <img src="doctor_banner.jpg" alt="Right Banner Image" />
            </div>

            {/* Meet Our Experts Section */}
            <div className="container mt-5">
                <div className="row">
                    {/* Add doctor profiles here */}
                    {data?.doctors.map((doctor)=>(
                    <div className="col-md-4" key={doctor._id}>
                        <div className="card">
                            <img src="doctor_1.jpg" alt="Doctor 1" />
                            <h3>{doctor.firstName}{doctor.lastName}</h3>
                            <p>Specialist in {doctor.specialization}</p>
                            <button className="card-btn">Know More</button>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="find-more-container">
                    <a href="#" className="btn btn-info">Find More</a>
                </div>
            </div>

            {/* FAQs Section */}
            <div className="container mt-5 faq-container">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                    <div className="faq-question" onClick={() => toggleAnswer(1)}>
                        How do I book an appointment with a doctor on this website?
                    </div>
                    <div className="faq-answer" id="faq-answer-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo vitae libero consectetur gravida. Suspendisse potenti.</div>
                </div>
                <div className="faq-item">
                    <div className="faq-question" onClick={() => toggleAnswer(2)}>
                        What information do I need to provide when booking an appointment?
                    </div>
                    <div className="faq-answer" id="faq-answer-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo vitae libero consectetur gravida. Suspendisse potenti.</div>
                </div>
                <div className="faq-item">
                    <div className="faq-question" onClick={() => toggleAnswer(3)}>
                        Is my personal information secure on this website?
                    </div>
                    <div className="faq-answer" id="faq-answer-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo vitae libero consectetur gravida. Suspendisse potenti.</div>
                </div>
                {/* Add more FAQ items as needed */}
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h4>Contact Us</h4>
                            <p>Email: info@bookmydoctor.com</p>
                            <p>Phone: +1 (123) 456-7890</p>
                        </div>
                        <div className="col-md-4">
                            <h4>Navigation</h4>
                            <ul className="list-unstyled">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Find a Doctor</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">About Us</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h4>Follow Us</h4>
                            <ul className="list-inline social-icons">
                                <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                                <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                                <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <hr className="bg-light" />
                    <div className="row">
                        <div className="col-md-12">
                            <p className="text-center">
                                © 2024 BookMyDoctor. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
