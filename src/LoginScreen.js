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

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  //   const history = useHistory();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();
    // Add authentication logic here...
    // On successful authentication:
    // history.push('/dashboard');
    navigate('/dashboard');
  };

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      style={{ padding: '20px', marginTop: '20px' }}
    >
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box m={2}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </Box>
        <Box m={2}>
          <TextField
            fullWidth
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </Box>
        <Box m={2}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Login;
