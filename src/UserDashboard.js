import React, { useState } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ButtonGroup,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MedicationInput from './MedicationInput';
import { Notifs } from './Notifs';
import { ViewMedications } from './ViewMedications';
import { useNavigate } from 'react-router-dom';

function TabPanel({ children, value, index }) {
  return value === index ? <Box p={3}>{children}</Box> : null;
}

export default function UserDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate('/login');
  };
  const selectedTabStyle = {
    backgroundColor: '#769FCD',
    color: 'white',
  };

  const unselectedTabStyle = {
    backgroundColor: '#D6E6F2',
    color: '#333',
  };
  const appBarStyle = {
    backgroundColor: '#0D7377',
  };

  const companyNameStyle = {
    fontFamily: 'Belleza, sans-serif',
    fontSize: '2rem',
    color: '#FED766', // Golden color
    border: '2px solid #FED766', // Golden border
    borderRadius: '15px',
    padding: '5px 15px',
    margin: '0 15px',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.2)', // Adding a slight shadow for depth
  };
  return (
    <div style={{ backgroundColor: '#71C9CE' }}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <Typography style={companyNameStyle}>AgelessAid</Typography>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab
              label="View Medications"
              style={
                tabValue === 0
                  ? { ...selectedTabStyle, fontFamily: 'Raleway, sans-serif' }
                  : { ...unselectedTabStyle, fontFamily: 'Raleway, sans-serif' }
              }
            />
            <Tab
              label="Add Medications"
              style={
                tabValue === 1
                  ? { ...selectedTabStyle, fontFamily: 'Raleway, sans-serif' }
                  : { ...unselectedTabStyle, fontFamily: 'Raleway, sans-serif' }
              }
            />
            <Tab
              label="Notifications"
              style={
                tabValue === 2
                  ? { ...selectedTabStyle, fontFamily: 'Raleway, sans-serif' }
                  : { ...unselectedTabStyle, fontFamily: 'Raleway, sans-serif' }
              }
            />
          </Tabs>
          <Box flexGrow={1} />
          <ButtonGroup variant="text" onClick={handleClick}>
            <Typography
              variant="h6"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              Bharat
            </Typography>
            <IconButton size="small" aria-haspopup="true">
              <ArrowDropDownIcon />
            </IconButton>
          </ButtonGroup>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <ViewMedications />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <MedicationInput />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Notifs />
      </TabPanel>
    </div>
  );
}
