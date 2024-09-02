import React, { useState, useEffect } from 'react';
import OccurrenceForm from './components/OccurrenceForm';
import OccurrenceList from './components/OccurrenceList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const initialOccurrences = [
    {
      occurrenceDay: '25/01/2024',
      description: 'Pós operatório transplante de cabelo',
    },
    {
      occurrenceDay: '11/07/2024',
      description: 'Pós aplicação de plasma rico em plaquetas',
    },
  ];

  const [occurrences, setOccurrences] = useState([]);

  useEffect(() => {
    const storedOccurrences = JSON.parse(localStorage.getItem('occurrences'));
    if (storedOccurrences && storedOccurrences.length > 0) {
      setOccurrences(storedOccurrences);
    } else {
      setOccurrences(initialOccurrences);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('occurrences', JSON.stringify(occurrences));
  }, [occurrences]);

  const addOccurrence = (occurrence) => {
    setOccurrences([...occurrences, occurrence]);
  };

  const updateOccurrences = () => {
    const updatedOccurrences = [...occurrences];
    setOccurrences(updatedOccurrences);
  };

  const deleteOccurrence = (index) => {
    const updatedOccurrences = occurrences.filter((_, i) => i !== index);
    setOccurrences(updatedOccurrences);
  };

  return (
    <div className="container mt-5">
      <h1>Days Since Tracker</h1>
      <OccurrenceForm addOccurrence={addOccurrence} />
      <button className="btn btn-primary mt-3" onClick={updateOccurrences}>
        Update Days
      </button>
      <OccurrenceList occurrences={occurrences} deleteOccurrence={deleteOccurrence} />
    </div>
  );
}

export default App;
