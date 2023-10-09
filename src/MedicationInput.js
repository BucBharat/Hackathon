// Importing necessary dependencies
import React, { useState, useContext } from 'react';
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
import MedicationContext from './MedicationContext';

// Medication input component
export default function MedicationInput() {
  // Consuming the MedicationContext to get the addMedication method
  const { addMedication } = useContext(MedicationContext);

  // State definitions
  const [file, setFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [medication, setMedication] = useState({
    name: '',
    description: '',
    time: new Date(), // Represents both date and time
    picture: null,
    frequency: 'daily',
    phoneNumber: '',
    mediaUrl: '',
  });

  // File change handler
  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  // Generic input change handler
  const handleInputChange = event => {
    const { name, value } = event.target;
    setMedication(prev => ({ ...prev, [name]: value }));
  };

  // Handling date-time picker changes
  const handleDateTimeChange = newDateTime => {
    setMedication(prev => ({ ...prev, time: newDateTime }));
  };

  // Phone number change handler
  const handlePhoneChange = event => {
    const { value } = event.target;
    setMedication(prev => ({ ...prev, phoneNumber: value }));
  };

  // File upload handler
  const handleUpload = async event => {
    event.preventDefault();
    if (!file) return;

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': file.type, // e.g., 'image/jpeg' or 'application/pdf'
          'X-File-Name': file.name,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMediaUrl(data.mediaUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Medication submission handler
  const handleSubmit = async event => {
    event.preventDefault();

    const updatedTime = medication.time.toISOString();
    const updatedMedication = { ...medication, time: updatedTime };
    updatedMedication.mediaUrl = mediaUrl;
    console.log(updatedMedication);
    console.log(medication);
    // console.log(onAdd);

    try {
      const response = await fetch('http://localhost:5500/add-medication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMedication),
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
        mediaUrl: '',
      });
      setMediaUrl('');
      // Add medication to the list
      addMedication(updatedMedication);
    } catch (error) {
      console.error('There was an error sending the medication data:', error);
      // Providing an error message to the user
    }
  };

  // Rendered component
  return (
    <div style={{ minHeight: '100vh' }}>
      <Container
        component={Paper}
        maxWidth="sm"
        elevation={3}
        style={{
          padding: '20px',
          marginTop: '20px',
        }}
      >
        <Typography
          variant="h5"
          style={{
            fontWeight: 500,
            marginBottom: '20px',
            fontFamily: 'Raleway, sans-serif',
          }}
        >
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
              onChange={handlePhoneChange}
              type="tel"
              inputProps={{
                pattern: '\\d*',
                maxLength: 15,
              }}
              helperText="Please include the international code"
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
            <div>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload</button>
              {mediaUrl && <div>File uploaded successfully</div>}
            </div>
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
    </div>
  );
}
