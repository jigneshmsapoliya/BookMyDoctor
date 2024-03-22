import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const REGISTER_DOCTOR = gql`
  mutation RegisterDoctor($input: DoctorInput!) {
    registerDoctor(input: $input) {
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
      servicesOffered
    officeHours {
      hours
      parking
    }
    aboutMe
      imgUrl
    }
  }
`;

function Admin() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    specialization: '',
    hospitalAffiliation: '',
    experience: 0,
    education: [], // Initialize as an empty array
    insuranceAccepted: [], // Initialize as an empty array
    location: {
      address: '',
      city: '',
      state: '',
      country: ''
    },
    servicesOffered: [], // Initialize as an empty array
    officeHours: {
      hours: '',
      parking: ''
    },
    aboutMe: '',
    imgUrl: ''
  });

  const [registerDoctor] = useMutation(REGISTER_DOCTOR);

  

const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'experience') {
      setFormData({
        ...formData,
        [name]: parseInt(value) // Parse value as an integer
      });
    } else if (name === 'servicesOffered') {
      setFormData({
        ...formData,
        [name]: value.split(',').map(item => item.trim()) // Split services by comma and trim whitespace
      });
    } else if (name === 'officeHours.hours' || name === 'officeHours.parking') {
      // Handle nested object properties for office hours
      const officeHoursField = name.split('.')[1];
      setFormData({
        ...formData,
        officeHours: {
          ...formData.officeHours,
          [officeHoursField]: value
        }
      });
    } else if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value
        }
      });
    } else if (name === 'education' || name === 'insuranceAccepted') {
      // If the field is education or insuranceAccepted, split the value by comma to form an array
      setFormData({
        ...formData,
        [name]: value.split(',').map(item => item.trim()) // Trim whitespace and split by comma
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerDoctor({
        variables: { input: formData }
      });
      console.log('Doctor registered:', data.registerDoctor);
      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        specialization: '',
        hospitalAffiliation: '',
        experience: 0,
        education: [],
        insuranceAccepted: [],
        location: {
          address: '',
          city: '',
          state: '',
          country: ''
        },
        servicesOffered: [], // Add resetting for servicesOffered
        officeHours: {
          hours: '',
          parking: ''
        }, // Add resetting for officeHours
        aboutMe: '', // Add resetting for aboutMe
        imgUrl: ''
      });
    } catch (error) {
      console.error('Error registering doctor:', error);
    }
  };
  

  return (
    <div>
      <h1>Add a Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Specialization:
          <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
        </label>
        <label>
          Hospital Affiliation:
          <input type="text" name="hospitalAffiliation" value={formData.hospitalAffiliation} onChange={handleChange} />
        </label>
        <label>
          Experience (years):
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
        </label>
        <label>
          Education (comma-separated):
          <input type="text" name="education" value={formData.education.join(',')} onChange={handleChange} />
        </label>
        <label>
          Insurance Accepted (comma-separated):
          <input type="text" name="insuranceAccepted" value={formData.insuranceAccepted.join(',')} onChange={handleChange} />
        </label>
        <label>
          Location Address:
          <input type="text" name="location.address" value={formData.location.address} onChange={handleChange} required />
        </label>
        <label>
          City:
          <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} required />
        </label>
        <label>
          State:
          <input type="text" name="location.state" value={formData.location.state} onChange={handleChange} required />
        </label>
        <label>
          Country:
          <input type="text" name="location.country" value={formData.location.country} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} />
        </label>

        

        <label>
    Services Offered (comma-separated):
    <input type="text" name="servicesOffered" value={formData.servicesOffered.join(',')} onChange={handleChange} />
  </label>
  <label>
    Office Hours:
    <input type="text" name="officeHours.hours" value={formData.officeHours.hours} onChange={handleChange} />
  </label>
  <label>
    Parking:
    <input type="text" name="officeHours.parking" value={formData.officeHours.parking} onChange={handleChange} />
  </label>
  <label>
    About Me:
    <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} />
  </label>

        <button type="submit">Create a Profile</button>
      </form>
    </div>
  );
}

export default Admin;
