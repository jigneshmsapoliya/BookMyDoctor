import React from 'react';
import '../HomeComponent.css'; 
import '../HomeComponent.js'; 

const toggleAnswer = (id) => {
    var answer = document.getElementById(`faq-answer-${id}`);
    var toggleIcon = document.querySelector(`.faq-question[data-id="${id}"] .faq-toggle`);
  
    if (answer && toggleIcon) {
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
        toggleIcon.textContent = '+';
      } else {
        answer.style.display = 'block';
        toggleIcon.textContent = '-';
      }
    } else {
      console.error(`Elements not found for id ${id}`);
    }
  };
  
const HomeComponent = () => {
  return (
    <div>
    

      
      <div class="banner">
  <div class="banner-content">
    <h1>Get A Consultation From Your Best Doctor</h1>
    <p>Seek expert advice for your health. Consult with a qualified doctor today. </p>
    <a href="#" class="btn btn-success">Book Now</a>
  </div>
  <img src="doctor_banner.jpg" alt="Right Banner Image" />
</div>


     
<div class="container mt-5">
  <div class="row">
    <div class="col-md-4">
      <div class="card">
        <img src="doctor_1.jpg" alt="Doctor 1" />
        <h3>Dr. John Doe</h3>
        <p>Specialist in Cardiology</p>
        <button class="card-btn">Know More</button>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card">
        <img src="doctor_1.jpg" alt="Doctor 2" />
        <h3>Dr. Elise Nobel</h3>
        <p>Specialist in Pediatrics</p>
        <button class="card-btn">Know More</button>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card">
        <img src="doctor_1.jpg" alt="Doctor 3" />
        <h3>Dr. Robert Smith </h3>
        <p>Specialist in Dermatology</p>
        <button class="card-btn">Know More</button>
      </div>
    </div>
   
  </div>

  <div class="find-more-container">
    <a href="/findadoctor" class="btn btn-info">Find More</a>
  </div>
</div>


{/* FAQs Section */}
<div class="container mt-5 faq-container">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-item">
    <div class="faq-question" onClick={() => toggleAnswer(1)}>
      How do I book an appointment with a doctor on this website?
      <span class="faq-toggle">+</span>
    </div>
    <div class="faq-answer" id="faq-answer-1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo vitae libero consectetur gravida. Suspendisse potenti.
    </div>
  </div>
  <div class="faq-item">
    <div class="faq-question" onClick={() => toggleAnswer(2)}>
      What information do I need to provide when booking an appointment?
      <span class="faq-toggle">+</span>
    </div>
    <div class="faq-answer" id="faq-answer-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo vitae libero consectetur gravida. Suspendisse potenti.
    </div>
  </div>
  <div class="faq-item">
    <div class="faq-question" onClick={() => toggleAnswer(3)}>
      Is my personal information secure on this website?
      <span class="faq-toggle">+</span>
    </div>
    <div class="faq-answer" id="faq-answer-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo vitae libero consectetur gravida. Suspendisse potenti.
    </div>
  </div>
  {/* Add more FAQ items as needed */}
</div>
      
    </div>
  );
}

export default HomeComponent;
