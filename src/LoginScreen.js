import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginScreenStyles.scss';
function LoginScreen() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  const redirectToRegister = () => {
    navigate('/register');
  };
  const handleSubmit = event => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <section id="entry-page">
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
