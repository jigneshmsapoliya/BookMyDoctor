import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';

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

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: AppointmentInput!) {
    createAppointment(input: $input) {
      _id
      doctor {
        _id
        firstName
        lastName
      }
      user {
        _id
        name
      }
      date
      timeSlot
      patientName
      phoneNumber
      email
    }
  }
`;

  

function BookAppointment() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_DOCTOR, {
      variables: { id },
    });
  
    const [patientName, setPatientName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [reasonForAppointment, setReasonForAppointment] = useState('');
    const [notes, setNotes] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
  
    const [createAppointment] = useMutation(CREATE_APPOINTMENT);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createAppointment({
          variables: {
            input: {
              doctorId: id,
              // Include userId if needed
              date: new Date().toISOString(),
              timeSlot,
              patientName,
              phoneNumber,
              email,
              reasonForAppointment,
              notes,
            },
          },
        });
        alert('Appointment booked successfully!');
        // Clear form fields after submission
        setPatientName('');
        setPhoneNumber('');
        setEmail('');
        setReasonForAppointment('');
        setNotes('');
        setTimeSlot('');
      } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment. Please try again.');
      }
    };
  
    if (loading) return <p>Loading doctor information...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const { doctor } = data;

  return (
    <div className="container mt-5">
      <h2>Book an Appointment with Dr. {doctor.firstName} {doctor.lastName}</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="doctor-info">
            <img src={doctor.imgUrl} alt={`${doctor.firstName} ${doctor.lastName}`} className="img-fluid" />
            <h3 className="doctor-name">Dr. {doctor.firstName} {doctor.lastName}</h3>
            <h4>Address</h4>
            <p className="doctor-address">{doctor.location.address}, {doctor.location.city}, {doctor.location.state}, {doctor.location.country}</p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Book Appointment</h2>
              <form onSubmit={handleSubmit}>
  {/* Form fields */}
  <div className="mb-3">
    <label htmlFor="patientName" className="form-label">Patient Name:</label>
    <input
      type="text"
      className="form-control"
      id="patientName"
      value={patientName}
      onChange={(e) => setPatientName(e.target.value)}
      required
    />
  </div>
  {/* Phone Number */}
  <div className="mb-3">
    <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
    <input
      type="tel"
      className="form-control"
      id="phoneNumber"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      required
    />
  </div>
  {/* Email */}
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email:</label>
    <input
      type="email"
      className="form-control"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
  {/* Reason for Appointment */}
  <div className="mb-3">
    <label htmlFor="reasonForAppointment" className="form-label">Reason for Appointment:</label>
    <textarea
      className="form-control"
      id="reasonForAppointment"
      value={reasonForAppointment}
      onChange={(e) => setReasonForAppointment(e.target.value)}
      rows="3"
    ></textarea>
  </div>
  {/* Notes */}
  <div className="mb-3">
    <label htmlFor="notes" className="form-label">Notes:</label>
    <textarea
      className="form-control"
      id="notes"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      rows="3"
    ></textarea>
  </div>
  {/* Time Slot */}
  <div className="mb-3">
    <label htmlFor="timeSlot" className="form-label">Time Slot:</label>
    <input
      type="text"
      className="form-control"
      id="timeSlot"
      value={timeSlot}
      onChange={(e) => setTimeSlot(e.target.value)}
      required
    />
  </div>
  {/* Submit button */}
  <button type="submit" className="btn btn-dark">Submit</button>
</form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
