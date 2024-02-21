import React, { useState } from 'react';
import { services } from '../data/services';
import '../Services.css'; 

const FaqItem = ({ name, desc, bgColor, textColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`faq-card mb-3 ${isExpanded ? 'border-primary' : ''}`}>
      <div
        className={`faq-card-header d-flex justify-content-between align-items-center ${isExpanded ? 'bg-primary text-white' : ''}`}
        onClick={toggleVisibility}
        style={{ cursor: 'pointer' }}
      >
        <h5 className="mb-0">{name}</h5>
        <button className="btn btn-sm">{isExpanded ? '-' : '+'}</button>
      </div>
      {isExpanded && (
        <div className={`faq-card-body ${bgColor ? `bg-${bgColor}` : ''} ${textColor ? `text-${textColor}` : ''}`}>
          <p className="card-text">{desc}</p>
        </div>
      )}
    </div>
  );
};

const Faqs = ({ services }) => (
  <div className="faqs-container">
    {services.map((service, index) => (
      <FaqItem key={index} {...service} />
    ))}
  </div>
);

const Services = () => (
  <div className="container mt-5">
    <h1 className="mb-4">Our Top Services</h1>
    <Faqs services={services} />
  </div>
);

export default Services;
