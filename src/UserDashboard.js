import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import MedicationInput from './MedicationInput';
import UploadComponent from './UploadComponent';
import { ViewMedications } from './ViewMedications';
function TabPanel({ children, value, index }) {
  return value === index ? <Box p={3}>{children}</Box> : null;
}

export default function UserDashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const selectedTabStyle = {
    backgroundColor: '#008080', // Dark teal
    color: 'white',
  };

  const unselectedTabStyle = {
    backgroundColor: '#f2f2f2', // Light gray
    color: '#333', // Dark gray
  };
  const appBarStyle = {
    backgroundColor: '#4d8080', // Lighter teal
  };

  return (
    <div>
      <AppBar position="static" style={appBarStyle}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab
            label="View Medications"
            style={tabValue === 0 ? selectedTabStyle : unselectedTabStyle}
          />
          <Tab
            label="Add Medications"
            style={tabValue === 1 ? selectedTabStyle : unselectedTabStyle}
          />
          <Tab
            label="Notifications"
            style={tabValue === 2 ? selectedTabStyle : unselectedTabStyle}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <ViewMedications />
        {/* View Medications Content Here */}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <MedicationInput />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <UploadComponent />
      </TabPanel>
    </div>
  );
}
