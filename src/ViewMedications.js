import { Box, Paper, Typography, List, ListItem, Divider } from '@mui/material';
import React from 'react';

export function ViewMedications() {
  const medicationsData = [
    {
      id: 1,
      name: 'Painkiller',
      description: 'For headache relief',
      time: '8:00 AM',
      picture: null, // For simplicity, we'll assume no picture.
      frequency: 'daily',
    },
    //... Add more sample medication entries as needed
  ];

  return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 600 }}>
        Your Medications
      </Typography>
      <List>
        {medicationsData.map(med => (
          <React.Fragment key={med.id}>
            <ListItem>
              <Paper
                elevation={3}
                style={{ padding: '20px', width: '100%', borderRadius: '15px' }}
              >
                <Typography variant="h5" style={{ fontWeight: 550 }}>
                  {med.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  style={{ marginTop: '10px' }}
                >
                  {med.description}
                </Typography>
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  Time: <strong>{med.time}</strong>
                </Typography>
                <Typography variant="body1" style={{ marginTop: '5px' }}>
                  Frequency: <strong>{med.frequency}</strong>
                </Typography>
                {/* If pictures are available in the future, they can be rendered here */}
              </Paper>
            </ListItem>
            <Divider variant="middle" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
