import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import '../App.css';
import { services } from '../data/services';


const firebaseConfig = {
  apiKey: "AIzaSyBvwRPmx3wsVrolRp7IICwsa7VxuJq4gck",
  authDomain: "bookmydoctor-fdc11.firebaseapp.com",
  projectId: "bookmydoctor-fdc11",
  storageBucket: "bookmydoctor-fdc11.appspot.com",
  messagingSenderId: "453069232976",
  appId: "1:453069232976:web:273804b7dc6e870a48aa55"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

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

function AddDoctor() {
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
    const { name, value, options } = e.target;

    if (name === 'experience') {
      setFormData({
        ...formData,
        [name]: parseInt(value) // Parse value as an integer
      });
    }  else if (name === 'officeHours.hours' || name === 'officeHours.parking') {
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
    } else if(name === 'servicesOffered'){
      const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
      setFormData({
        ...formData,
        [name]: selectedValues
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const imgUrl = await fileRef.getDownloadURL();
    setFormData({ ...formData, imgUrl });
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    const {
      firstName,
      lastName,
      specialization,
      experience,
      location,
      servicesOffered
    } = formData;
  
    if (!firstName.trim()) {
      errors.firstName = 'Please fill out the First Name field.';
    }
    if (!lastName.trim()) {
      errors.lastName = 'Please fill out the Last Name field.';
    }
    if (!specialization.trim()) {
      errors.specialization = 'Please fill out the Specialization field.';
    }
    if (!experience) {
      errors.experience = 'Please fill out the Experience field.';
    }
    if (!location.address.trim()) {
      errors.address = 'Please fill out the Address field.';
    }
    if (!location.city.trim()) {
      errors.city = 'Please fill out the City field.';
    }
    if (!location.state.trim()) {
      errors.state = 'Please fill out the State field.';
    }
    if (!location.country.trim()) {
      errors.country = 'Please fill out the Country field.';
    }
    if (servicesOffered.length === 0) {
      errors.servicesOffered = 'Please select at least one Service Offered.';
    }
  
    setErrors(errors);
  
    return Object.keys(errors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

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
    <div class="centered-form">
  <div class="form-container">
    <div class="mt-4">
      <h1 class="text-center">Add Doctor Profile</h1>
      <form class="mt-4" onSubmit={handleSubmit}>

        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" class="form-control mb-2" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
        </div>

        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" class="form-control mb-2" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
        </div>

        <div class="form-group">
          <label for="specialization">Specialization:</label>
          <input type="text" class="form-control mb-2" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} required />
          {errors.specialization && <span className="text-danger">{errors.specialization}</span>}
        </div>

        <div class="form-group">
          <label for="hospitalAffiliation">Hospital Affiliation:</label>
          <input type="text" class="form-control mb-2" id="hospitalAffiliation" name="hospitalAffiliation" value={formData.hospitalAffiliation} onChange={handleChange} />
          
        </div>

        <div class="form-group">
          <label for="experience">Experience (years):</label>
          <input type="number" class="form-control mb-2" id="experience" name="experience" value={formData.experience} onChange={handleChange} required />
          {errors.experience && <span className="text-danger">{errors.experience}</span>}
        </div>

        <div class="form-group">
          <label for="education">Education (comma-separated):</label>
          <input type="text" class="form-control mb-2" id="education" name="education" value={formData.education.join(',')} onChange={handleChange} />
        </div>

        <div class="form-group">
          <label for="insuranceAccepted">Insurance Accepted (comma-separated):</label>
          <input type="text" class="form-control mb-2" id="insuranceAccepted" name="insuranceAccepted" value={formData.insuranceAccepted.join(',')} onChange={handleChange} />
        </div>

        <div class="form-group">
          <label for="locationAddress">Address:</label>
          <input type="text" class="form-control mb-2" id="locationAddress" name="location.address" value={formData.location.address} onChange={handleChange} required />
          {errors.address && <span className="text-danger">{errors.address}</span>} 
        </div>

        <div class="form-group">
          <label for="city">City:</label>
          <input type="text" class="form-control mb-2" id="city" name="location.city" value={formData.location.city} onChange={handleChange} required />
          {errors.city && <span className="text-danger">{errors.city}</span>}
        </div>

        <div class="form-group">
          <label for="state">State:</label>
          <input type="text" class="form-control  mb-2" id="state" name="location.state" value={formData.location.state} onChange={handleChange} required />
          {errors.state && <span className="text-danger">{errors.state}</span>}
        </div>

        <div class="form-group">
          <label for="country">Country:</label>
          <input type="text" class="form-control mb-2" id="country" name="location.country" value={formData.location.country} onChange={handleChange} required />
          {errors.country && <span className="text-danger">{errors.country}</span>}
        </div>

        <div class="form-group">
          <label for="image">Add Image:</label>
          <input type="file" class="form-control-file  mb-2" id="image" onChange={handleImageChange} />
        </div>

        <div className="form-group">
          <label htmlFor="servicesOffered">Services Offered:</label>
          <select className="form-control mb-2" id="servicesOffered" name="servicesOffered" multiple value={formData.servicesOffered} onChange={handleChange}>
            {services.map((service, index) => (
              <option key={index} value={service.name}>{service.name}</option>
            ))}
          </select>
          {errors.servicesOffered && <span className="text-danger">{errors.servicesOffered}</span>}
        </div>

        <div class="form-group">
          <label for="officeHours">Office Hours:</label>
          <input type="text" class="form-control mb-2" id="officeHours" name="officeHours.hours" value={formData.officeHours.hours} onChange={handleChange} />
        </div>

        <div class="form-group">
          <label for="parking">Parking:</label>
          <input type="text" class="form-control mb-2" id="parking" name="officeHours.parking" value={formData.officeHours.parking} onChange={handleChange} />
        </div>

        <div class="form-group">
          <label for="aboutMe">About Me:</label>
          <textarea class="form-control mb-2" id="aboutMe" name="aboutMe" value={formData.aboutMe} onChange={handleChange}></textarea>
        </div>

        <button type="submit" class="btn btn-primary m-4">Create a Profile</button>
      </form>
      </div>
  </div>
</div>
  );
}

export default AddDoctor;