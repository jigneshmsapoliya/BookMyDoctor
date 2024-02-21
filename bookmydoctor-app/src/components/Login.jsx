import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import '../App.css';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      email
      name
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser] = useMutation(LOGIN_USER);
  

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      });
      console.log('User logged in:', data.loginUser);
    } catch (error) {
      if (error.graphQLErrors) {
        console.error('GraphQL Errors:', error.graphQLErrors);
      }
      if (error.networkError) {
        console.error('Network Error:', error.networkError);
      }
      console.error('Error logging in:', error.message);
    }
  };

  return (

    <main id='login-main'>

    <div className="wrapper">

          <img src="./doc-image.png" alt="" className="doc-image" />

          <div className='login-container'>
            <h1>Login Page</h1>
            <form id='login-form'>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <button type="button" onClick={handleLogin} id="login-btn">
                Login
              </button>
            </form>
          </div>
    </div>

    </main>
  );
}

export default Login;
