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

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [bloodTypeError, setBloodTypeError] = useState('');
  const [serverError, setServerError] = useState('');
  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegister = async () => {
    setEmailError('');
    setPasswordError('');
    setNameError('');
    setPhoneError('');
    setRoleError('');
    setGenderError('');
    setBloodTypeError('');
    setServerError('');

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
      
      window.location.href = '/login'; 
    } catch (error) {
      console.error('Error registering user:', error.message);
      
      if (error.graphQLErrors) {
        // Handle specific GraphQL errors returned from the server
        error.graphQLErrors.forEach((graphQLError) => {
          switch (graphQLError.extensions.code) {
            case 'BAD_USER_INPUT':
              // Specific error code for validation failure
              const fieldErrors = graphQLError.extensions.errors;
              Object.keys(fieldErrors).forEach((field) => {
                switch (field) {
                  case 'email':
                    setEmailError(fieldErrors[field]);
                    break;
                  case 'password':
                    setPasswordError(fieldErrors[field]);
                    break;
                  case 'name':
                    setNameError(fieldErrors[field]);
                    break;
                  case 'phone':
                    setPhoneError(fieldErrors[field]);
                    break;
                  case 'role':
                    setRoleError(fieldErrors[field]);
                    break;
                  case 'gender':
                    setGenderError(fieldErrors[field]);
                    break;
                  case 'bloodType':
                    setBloodTypeError(fieldErrors[field]);
                    break;
                  default:
                    // Handle other fields if needed
                }
              });
              break;
            default:
              // Handle other GraphQL errors
              setServerError(graphQLError.message);
          }
        });
      } else {
        // Handle other non-GraphQL errors
        setServerError(error.message);
      }
    }
  };

  return (
    <main>
      <img src="./logo.jpeg" alt="logo image" />
      <div className="register-container">
        <h1>Registration</h1>
        <form>
          <div className="registration-container">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <span className="error-message">{emailError}</span>

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className="error-message">{passwordError}</span>

            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <span className="error-message">{nameError}</span>

            <label>Phone:</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <span className="error-message">{phoneError}</span>

            <label>Role:</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
            <span className="error-message">{roleError}</span>

            <label>Gender:</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
            <span className="error-message">{genderError}</span>

            <label>Blood Type:</label>
            <input type="text" value={bloodType} onChange={(e) => setBloodType(e.target.value)} />
            <span className="error-message">{bloodTypeError}</span>
          </div>

          <button type="button" id="register_button" onClick={handleRegister}>
            Register
          </button>

          {serverError && <div className="error-message">{serverError}</div>}
        </form>
      </div>
    </main>
  );
}

export default Register;
