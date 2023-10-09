// MedicationContext.js
import React from 'react';

// Creating a new context for medications
const MedicationContext = React.createContext();

// Exporting the context for use in other components
export default MedicationContext;

// A provider component for the MedicationContext
export function MedicationProvider({ children }) {
  // State hook to manage an array of medications
  const [medications, setMedications] = React.useState([]);

  // Function to add a new medication to the medications state
  const addMedication = newMedication => {
    setMedications(prevMedications => [...prevMedications, newMedication]);
  };

  // Wrapping children components with the MedicationContext provider
  // and passing down the medications state and the addMedication function as values
  return (
    <MedicationContext.Provider value={{ medications, addMedication }}>
      {children}
    </MedicationContext.Provider>
  );
}
