import React from 'react';

const Footer = () => {
  return (
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
    <li class="small-list-item"><a href="/">Home</a></li>
    <li class="small-list-item"><a href="/findadoctor">Find a Doctor</a></li>
    <li class="small-list-item"><a href="/services">Services</a></li>
    <li class="small-list-item"><a href="#">About Us</a></li>
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
  );
};

export default Footer;
