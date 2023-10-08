import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import UserDashboard from './UserDashboard';
import { MedicationProvider } from './MedicationContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/dashboard"
          element={
            <MedicationProvider>
              <UserDashboard />
            </MedicationProvider>
          }
        />
        <Route path="/" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
