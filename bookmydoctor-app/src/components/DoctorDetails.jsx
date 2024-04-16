import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import '../App.css'; 

const GET_DOCTOR = gql`
  query GetDoctor($id: ID!) {
    doctor(id: $id) {
      _id
      firstName
      lastName
      specialization
      hospitalAffiliation
      experience
      education
      insuranceAccepted
      location {
        address
        city
        state
        country
      }
      imgUrl
      servicesOffered
      officeHours {
        hours
        parking
      }
      aboutMe
    }
  }
`;

const DoctorDetails = () => {
    const { id } = useParams();
  const { loading, error, data } = useQuery(GET_DOCTOR, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { doctor } = data;
  return (
    <div className="doctor-profile">
      <div className="doctor-info">

        <div className="doctor-details">
          <h1 className="doctor-name">Dr.{doctor.firstName}{doctor.lastName}</h1>

          <div>
            <h5 className='contact-title'>Contact Information: </h5>
            <p className="contact-info">
              <span className="contact-label">Phone:</span>
              <span className="contact-value">123-456-7890</span>
            </p>
            <p className="contact-info">
              <span className="contact-label">Email:</span>
              <span className="contact-value">dr.emily.johnson@example.com</span>
            </p>
            <p className="contact-info">
              <span className="contact-label">Address:</span>
              <span className="contact-value">{doctor.location.address}, {doctor.location.city}, {doctor.location.state}, {doctor.location.country}</span>
            </p>
          </div>
        </div>
        <div className="avtar">
            <img src={doctor.imgUrl} alt="Doctor avatar" className="doctor-avatar" />
            
            <Link to={`/book-appointment/${doctor._id}`} className='custom-button appointment_button'>Book Now</Link>

     </div>
      </div>
      <div className="doctor-bio">
        <h3 className="doctor-bio-title">About Dr.{doctor.firstName}{doctor.lastName}</h3>
        <p className="doctor-bio-text">
        {doctor.aboutMe}
        </p>
      </div>
      <div className="doctor-services">
        <h3 className="doctor-services-title">Services Offered</h3>
        <ul className="services-list">
        {doctor.servicesOffered.map((service, index) => (
            <li key={index} className="service">{service}</li>
          ))}
        </ul>
      </div>
      <div className="doctor-office-hours">
        <h3 className="doctor-hours-title">Office Hours</h3>
        <p className="office-hours-text">{doctor.officeHours.hours}</p>
      </div>
      <div className="doctor-parking">
        <h3 className="doctor-parking-title">Parking</h3>
        <p className="parking-info">Free parking available onsite</p>
      </div>
    </div>
  );
}

export default DoctorDetails;