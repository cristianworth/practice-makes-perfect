import React, { useState, useEffect } from 'react';
import OccurrenceForm from './components/OccurrenceForm';
import OccurrenceList from './components/OccurrenceList';

function App() {
  const [occurrences, setOccurrences] = useState([]);

  useEffect(() => {
    const storedOccurrences = JSON.parse(localStorage.getItem('occurrences'));
    if (storedOccurrences) {
      setOccurrences(storedOccurrences);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('occurrences', JSON.stringify(occurrences));
  }, [occurrences]);

  const addOccurrence = (occurrence) => {
    setOccurrences([...occurrences, occurrence]);
  };

  return (
    <div>
      <h1>Occurrence Tracker</h1>
      <OccurrenceForm addOccurrence={addOccurrence} />
      <OccurrenceList occurrences={occurrences} />
    </div>
  );
}

export default App;
