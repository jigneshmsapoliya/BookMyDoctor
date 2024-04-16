import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
function Login({setUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // to navigate to other page
  const navigate = useNavigate();
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  
  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: {
          email,
          password
        
        },
      });
      console.log('User logged in:', data.loginUser.email);
      
      if (data.loginUser.email === 'admin@gmail.com') {
        // Redirect to the admin page
        setUser(data.loginUser);
        navigate('/admin');
      } else {
        // Redirect to the home page for regular users
        navigate('/', { state: { from: '/login' } });
        setUser(data.loginUser);
        sessionStorage.setItem('user', JSON.stringify(data.loginUser));
      }
    } catch (error) {
      if (error.graphQLErrors) {
        console.error('GraphQL Errors:', error.graphQLErrors);
      }
      if (error.networkError) {
        console.error('Network Error:', error.networkError);
      }
      console.error('Error logging in:', error.message);
      toast.error(error.message, {
        position: "bottom-right"
      });
    }
  };
  

  return (

    <main id='login-main'>

    <div className="wrapper">

          <img src="./doc-image.png" alt="" className="doc-image" />

          <div className='login-container'>
            {/* <h1>Login</h1> */}
            <form id='login-form'>
              <label>Email:</label>
              <input className='mb-2' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

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
