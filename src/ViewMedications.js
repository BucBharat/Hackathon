// Required React and Material-UI imports
import {
  Box,
  Typography,
  Grid,
  Card,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Alarm, Info } from '@mui/icons-material';
import React, { useContext } from 'react';

// Importing the Medication context to access the list of medications
import MedicationContext from './MedicationContext';
import CardContent from '@mui/material/CardContent';

// Component to display and view user medications
export function ViewMedications() {
  // Destructuring the list of medications from the context
  const { medications } = useContext(MedicationContext);

  return (
    <Box
      m={2}
      style={{
        borderRadius: '8px',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        style={{
          fontWeight: 200,
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          fontFamily: "'Belleza', serif", // if you've imported a different font, use that instead
        }}
      >
        Your Medications
      </Typography>
      <Grid container spacing={3}>
        {medications &&
          medications.map((med, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} md={6}>
                <Box m={1}>
                  <Card
                    sx={{
                      backgroundColor: '#A6E3E9',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      },
                      width: '100%',
                      borderRadius: '15px',
                    }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ fontFamily: "'Roboto Slab', serif" }}
                        >
                          {med.name}
                        </Typography>
                        <Tooltip title="Medication Info">
                          <IconButton size="small">
                            <Info fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: '10px',
                          fontFamily: "'Roboto Slab', sans-serif",
                        }}
                      >
                        Frequency: <strong>{med.frequency}</strong>
                      </Typography>
                      <Typography
                        sx={{
                          marginTop: '10px',
                          fontFamily: 'Dosis, sans-serif',
                          fontSize: '20px',
                        }}
                        color="text.secondary"
                      >
                        {med.description}
                      </Typography>

                      <Box
                        display="flex"
                        alignItems="center"
                        mt={2}
                        sx={{ fontSize: 16, color: 'text.secondary' }}
                      >
                        <Alarm
                          fontSize="small"
                          style={{ marginRight: '4px' }}
                        />
                        {new Date(med.time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
    </Box>
  );
}
