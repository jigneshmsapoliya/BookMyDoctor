// src/components/Register.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!,
    $password: String!,
    $name: String!,
    $phone: String,
    $role: String,
    $gender: String,
    $bloodType: String
  ) {
    registerUser(
      email: $email,
      password: $password,
      name: $name,
      phone: $phone,
      role: $role,
      gender: $gender,
      bloodType: $bloodType
    ) {
      _id
      email
      name
    }
  }
`;

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');

  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegister = async () => {
    try {
      const { data } = await registerUser({
        variables: {
          email,
          password,
          name,
          phone,
          role,
          gender,
          bloodType,
        },
      });
      console.log('User registered:', data.registerUser);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (

    <div class="container-fluid ">
    <div class="row">
    
      <div class="col-lg-6 doctor-illustration d-none d-lg-block mt-6"></div>


      <div class="col-lg-6 custom">
      <form>
        <div  class="registration-container">
      <label>Email:</label>
        <input  class="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input class="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Name:</label>
        <input  class="form-control"type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Phone:</label>
        <input class="form-control" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Role:</label>
        <input class="form-control" type="text" value={role} onChange={(e) => setRole(e.target.value)} />

        <label>Gender:</label>
        <input class="form-control" type="text" value={gender} onChange={(e) => setGender(e.target.value)} />

        <label>Blood Type:</label>
        <input class="form-control" type="text" value={bloodType} onChange={(e) => setBloodType(e.target.value)} />

        </div>

        <button type="button" id="register_button" class="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
      </form>
      </div>
    </div>
  </div>









  );
}

export default Register;
