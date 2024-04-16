import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';


import '../HomeComponent.css';
import '../HomeComponent.js';

const GET_DOCTORS = gql`
  query {
    doctors {
      _id
      firstName
      lastName
      specialization
      imgUrl
    }
  }
`;

const HomeComponent = () => {
  const { loading, error, data } = useQuery(GET_DOCTORS);
  const [faqAnswersVisible, setFaqAnswersVisible] = useState({});
  
  const toggleAnswer = (id) => {
    setFaqAnswersVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  

  return (
    <div>
      <div class="banner">
        <div class="banner-content">
          <h1>Get A Consultation From Your Best Doctor</h1>
          <p>Seek expert advice for your health. Consult with a qualified doctor today. </p>
          <Link to="/findadoctor" className="btn btn-primary bg-gradient">Book Now</Link>
        </div>
        <img src="doctor_banner.jpg" alt="Right Banner Image" />
      </div>

      <div class="container mt-5">
      <h1 class="display-4 mt-4 mb-4">Meet Our Expert</h1>
        <div class="row">
          {data?.doctors.slice(0, 3).map((doctor) => (
            <div className="col-md-4" key={doctor._id}>
              <div className="card">
                <img src={doctor.imgUrl} alt="Doctor 1" />
                <h3>{doctor.firstName} {doctor.lastName}</h3>
                <p>Specialist in {doctor.specialization}</p>
                <Link to={`/doctor/${doctor._id}`} className="card-btn btn btn-primary bg-gradient green-btn">Know More</Link>
              </div>
            </div>
          ))}
        </div>

        <div class="find-more-container">
          <a href="/findadoctor" class="btn btn-info">Find More</a>
        </div>
      </div>

      {/* FAQs Section */}
      <div class="container mt-5 faq-container">
        <h2>Frequently Asked Questions</h2>
        <div class={`faq-item ${faqAnswersVisible[1] ? 'faq-open' : ''}`}>
          <div class="faq-question" onClick={() => toggleAnswer(1)}>
            What information do I need to provide when booking an appointment?
          </div>
          <div class="faq-answer" style={{ display: faqAnswersVisible[1] ? 'block' : 'none' }}>
            Briefly describe the reason for your visit. This helps the doctor's office prepare for your appointment and allocate the appropriate amount of time.
            You may also be asked to provide your insurance information, such as your insurance company name, policy number, and member ID.
          </div>
        </div>

        <div class={`faq-item ${faqAnswersVisible[2] ? 'faq-open' : ''}`}>
          <div class="faq-question" onClick={() => toggleAnswer(2)}>
            Is my personal information secure on this website?
          </div>
          <div class="faq-answer" style={{ display: faqAnswersVisible[2] ? 'block' : 'none' }}>
            Our website uses SSL technology to encrypt all communication between your web browser and our servers.
            We store your personal information on secure servers with limited access. We also employ industry-standard practices to protect your data from unauthorized access, modification, or disclosure.
            We only collect the information necessary to provide you with the services you request. We will never share your personal information with third parties without your consent, except as required by law.
          </div>
        </div>

        <div class={`faq-item ${faqAnswersVisible[3] ? 'faq-open' : ''}`}>
          <div class="faq-question" onClick={() => toggleAnswer(3)}>
            How do I book an appointment with a doctor on this website?
          </div>
          <div class="faq-answer" style={{ display: faqAnswersVisible[3] ? 'block' : 'none' }}>
            Browse doctor profiles, learn about their expertise. Then, check the availability. After that you have to fill appointment details and click on book appointment button.
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
