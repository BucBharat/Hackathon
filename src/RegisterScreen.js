import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from '@mui/material';

function Register() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Add registration logic here...
  };

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      style={{ padding: '20px', marginTop: '20px' }}
    >
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box m={2}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            variant="outlined"
            value={userDetails.name}
            onChange={handleInputChange}
          />
        </Box>
        <Box m={2}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            value={userDetails.email}
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
            value={userDetails.password}
            onChange={handleInputChange}
          />
        </Box>
        <Box m={2}>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Register;
