import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// The Register component renders a registration form and handles user registration.
function Register() {
  // State to store user details (name, email, and password).
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Hook to programmatically navigate to different routes.
  const navigate = useNavigate();

  // Handler to update the state based on input changes.
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  // Function to navigate to the login page.
  const redirectToLogin = () => {
    navigate('/login');
  };

  // Handler for form submission.
  const handleSubmit = async event => {
    event.preventDefault();

    // Making an API call to register the user.
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      if (response.status === 200) {
        // Navigate to the dashboard upon successful registration.
        navigate('/dashboard');
      } else {
        // Log any error messages sent from the server.
        const data = await response.json();
        console.error('Registration error:', data.error);
      }
    } catch (error) {
      // Handle potential network or server errors.
      console.error('Error:', error);
    }
  };

  return (
    <section id="entry-page">
      <h1 className="app-title">AgelessAid</h1>
      <form>
        <h2>Join Us!</h2>
        <fieldset>
          <legend>Register</legend>
          <ul>
            <li className="input-row">
              <label htmlFor="name" className="input-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                required
              />
            </li>
            <li className="input-row">
              <label htmlFor="email" className="input-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                required
              />
            </li>
            <li className="input-row">
              <label htmlFor="password" className="input-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                required
              />
            </li>
          </ul>
        </fieldset>
        <button type="button" onClick={handleSubmit}>
          Register
        </button>
        <button type="button" onClick={redirectToLogin}>
          Already have an account? Login
        </button>
      </form>
    </section>
  );
}

export default Register;
