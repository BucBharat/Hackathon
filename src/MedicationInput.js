import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Container,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
// import { DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker, DatePicker, DateTimePicker } from '@mui/x-date-pickers';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
export default function MedicationInput() {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [medication, setMedication] = useState({
    name: '',
    description: '',
    time: new Date(), // This will now represent both date and time
    picture: null,
    frequency: 'daily',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMedication(prev => ({ ...prev, [name]: value }));
  };
  // const handleDateChange = newDate => {
  //   setMedication(prev => ({ ...prev, date: newDate }));
  // };

  // const handleTimeChange = newTime => {
  //   setMedication(prev => ({ ...prev, time: newTime }));
  // };
  const handleDateTimeChange = newDateTime => {
    setMedication(prev => ({ ...prev, time: newDateTime }));
  };
  const handleFileChange = event => {
    const file = event.target.files[0];
    setMedication(prev => ({ ...prev, picture: file }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Convert the date object to a string before sending
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

      // Maybe reset the form or provide a success message to the user
      setMedication({
        name: '',
        description: '',
        time: new Date(),
        frequency: 'daily',
      });
    } catch (error) {
      console.error('There was an error sending the medication data:', error);
      // Maybe provide an error message to the user
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
        {/* <Box m={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Medication Date"
              inputFormat="MM/dd/yyyy"
              value={medication.date}
              onChange={handleDateChange}
              renderInput={params => (
                <TextField {...params} fullWidth variant="outlined" />
              )}
            />
          </LocalizationProvider>
        </Box> */}
        <Box m={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* <Stack spacing={3}>
              <TimePicker
                label="Medication Timing"
                inputFormat="hh:mm a"
                value={medication.time}
                onChange={handleTimeChange}
                renderInput={params => (
                  <TextField {...params} fullWidth variant="outlined" />
                )}
              /> */}
            <DateTimePicker
              label="Medication Date & Time"
              inputFormat="MM/dd/yyyy hh:mm a"
              value={medication.time}
              onChange={handleDateTimeChange}
              renderInput={params => (
                <TextField {...params} fullWidth variant="outlined" />
              )}
            />
            {/* </Stack> */}
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
