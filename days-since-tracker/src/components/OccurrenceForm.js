import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

function OccurrenceForm({ addOccurrence }) {
  const [occurrenceDay, setOccurrenceDay] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!occurrenceDay || !description) return;
    const occurrence = {
      occurrenceDay: format(occurrenceDay, 'dd/MM/yyyy'),
      description: description,
    };
    addOccurrence(occurrence);
    setOccurrenceDay(null);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline mt-3">
      <div className="form-group mr-3">
        <label className="mr-2">Occurrence Date:</label>
        <DatePicker
          selected={occurrenceDay}
          onChange={(date) => setOccurrenceDay(date)}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          required
        />
      </div>
      <div className="form-group mr-3">
        <label className="mr-2">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Add Occurrence
      </button>
    </form>
  );
}

export default OccurrenceForm;
