// MedicationContext.js
import React from 'react';

const MedicationContext = React.createContext();

export default MedicationContext;
export function MedicationProvider({ children }) {
  const [medications, setMedications] = React.useState([]);

  const addMedication = newMedication => {
    setMedications(prevMedications => [...prevMedications, newMedication]);
  };

  return (
    <MedicationContext.Provider value={{ medications, addMedication }}>
      {children}
    </MedicationContext.Provider>
  );
}
