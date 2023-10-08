import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  SvgIcon,
} from '@mui/material';
import { Alarm, Info } from '@mui/icons-material';
import React, { useContext } from 'react';
import MedicationContext from './MedicationContext';

export function Notifs() {
  const { medications } = useContext(MedicationContext);

  return (
    <Box
      style={{
        backgroundColor: '#71C9CE',
        borderRadius: '8px',
        minHeight: '100vh',
        margin: 0,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        style={{
          fontWeight: 700,
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          fontFamily: "'Roboto Slab', serif",
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
                      position: 'static', // From 'position-static' class
                    }}
                  >
                    <CardContent>
                      {/* Convert the given HTML to MUI components */}
                      <img
                        src="https://media.plivo.com/Account/MAOTHIODFMOWUTZMFLZS/Media/fccad0eb-c850-414b-b579-3d01654f966b"
                        alt="Dummy Thumbnail"
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                        }}
                      />
                      <Typography variant="h5" gutterBottom>
                        Featured post
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Nov 12
                      </Typography>
                      <Typography variant="body2">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content.
                      </Typography>
                      <SvgIcon>
                        {/* Assuming you have a chevron right icon. Replace with your actual icon */}
                        <path d="..." /> {/* Add your SVG path here */}
                      </SvgIcon>
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
