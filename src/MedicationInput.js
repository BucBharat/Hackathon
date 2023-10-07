import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Container,
  Paper,
  Typography,
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';

export default function MedicationInput() {
  const [medication, setMedication] = useState({
    name: '',
    description: '',
    time: new Date(), // Represents both date and time
    picture: null,
    frequency: 'daily',
    phoneNumber: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMedication(prev => ({ ...prev, [name]: value }));
  };

  const handleDateTimeChange = newDateTime => {
    setMedication(prev => ({ ...prev, time: newDateTime }));
  };
  const handleFileChange = event => {
    const file = event.target.files[0];
    setMedication(prev => ({ ...prev, picture: file }));
  };
  const handlePhoneChange = event => {
    const { value } = event.target;
    setMedication(prev => ({ ...prev, phoneNumber: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Converting the date object to a string before sending
    medication.time = medication.time.toISOString();
    console.log(medication);
    try {
      const response = await fetch('http://localhost:5000/add-medication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication),
      });

      const responseData = await response.json();
      console.log(responseData.message);

      // Resetting the form
      setMedication({
        name: '',
        description: '',
        time: new Date(),
        frequency: 'daily',
        phoneNumber: '',
      });
    } catch (error) {
      console.error('There was an error sending the medication data:', error);
      // Providing an error message to the user
    }
  };

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      elevation={3}
      style={{ padding: '20px', marginTop: '20px' }}
    >
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        Please enter the medication details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box m={2}>
          <TextField
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            value={medication.phoneNumber}
            onChange={handlePhoneChange} // Or handlePhoneChange if you'd prefer a separate handler
            type="tel" // Tells browsers to optimize the keyboard for phone number input
            inputProps={{
              pattern: '\\d*', // Ensures only numbers can be entered
              maxLength: 15, // Limits the length to 15 digits which should be sufficient for international numbers
            }}
          />
        </Box>

        <Box m={2}>
          <TextField
            fullWidth
            name="name"
            label="Medication Name"
            variant="outlined"
            value={medication.name}
            onChange={handleInputChange}
          />
        </Box>

        <Box m={2}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            variant="outlined"
            value={medication.description}
            onChange={handleInputChange}
          />
        </Box>

        <Box m={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Medication Date & Time"
              inputFormat="MM/dd/yyyy hh:mm a"
              value={medication.time}
              onChange={handleDateTimeChange}
              renderInput={params => (
                <TextField {...params} fullWidth variant="outlined" />
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box m={2}>
          <Button variant="contained" component="label">
            Upload Medication Picture
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>

        <Box m={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Reminder Frequency</InputLabel>
            <Select
              name="frequency"
              value={medication.frequency}
              onChange={handleInputChange}
              label="Reminder Frequency"
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="6-hours">Every 6 hours</MenuItem>
              <MenuItem value="12-hours">Every 12 hours</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box m={2}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
}
