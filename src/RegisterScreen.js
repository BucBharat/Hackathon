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
function Register() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };
  const redirectToLogin = () => {
    navigate('/login');
  };
  const handleSubmit = event => {
    event.preventDefault();
    // Add registration logic here...
    navigate('/dashboard');
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
