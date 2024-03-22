

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

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

const Profile = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_DOCTOR, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { doctor } = data;

  return (
    <div>
      <h1>Doctor Profile</h1>
      <p>Doctor ID: {doctor._id}</p>
      <p>First Name: {doctor.firstName}</p>
      <p>Last Name: {doctor.lastName}</p>
      <p>Specialization: {doctor.specialization}</p>
      <p>Hospital Affiliation: {doctor.hospitalAffiliation}</p>
      <p>Experience: {doctor.experience}</p>
      <p>Education: {doctor.education.join(', ')}</p>
      <p>Insurance Accepted: {doctor.insuranceAccepted.join(', ')}</p>
      <p>Location: {doctor.location.address}, {doctor.location.city}, {doctor.location.state}, {doctor.location.country}</p>
      <p>Image: <img src={doctor.imgUrl} alt="Doctor" /></p>
      <p>Services Offered: {doctor.servicesOffered.join(', ')}</p>
      <p>Office Hours: {doctor.officeHours.hours}</p>
      <p>About Me: {doctor.aboutMe}</p>
    </div>
  );
};

export default Profile;