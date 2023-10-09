import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginScreenStyles.scss';

// The LoginScreen component is responsible for rendering the login form and handling user authentication.
function LoginScreen() {
  // State to store user credentials (email and password).
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  // Hook to programmatically navigate to different routes.
  const navigate = useNavigate();

  // Handler to update the state based on input changes.
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  // Function to navigate to the register page.
  const redirectToRegister = () => {
    navigate('/register');
  };

  // State to handle and display any error messages.
  const [error, setError] = useState(null);

  // Handler for form submission.
  const handleSubmit = async event => {
    event.preventDefault();

    // Making an API call to authenticate the user.
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      // Check if the authentication was successful.
      if (response.ok) {
        // Upon successful authentication, navigate to the dashboard.
        navigate('/dashboard');
      } else {
        // Display any error messages sent from the server.
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      // Handle potential network or server errors.
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="entry-page">
      <h1 className="app-title">AgelessAid</h1>
      <form>
        <h2>Welcome Back!</h2>
        <fieldset>
          <legend>Log In</legend>
          <ul>
            <li className="input-row">
              <label htmlFor="email" className="input-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
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
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </li>
          </ul>
        </fieldset>
        <button type="button" onClick={handleSubmit}>
          Login
        </button>
        <button type="button" onClick={redirectToRegister}>
          Register
        </button>
      </form>
    </section>
  );
}

export default LoginScreen;
