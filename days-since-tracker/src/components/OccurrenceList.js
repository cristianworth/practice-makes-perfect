import React from 'react';
import { parse, differenceInDays, differenceInMonths, subMonths } from 'date-fns';

function OccurrenceList({ occurrences, deleteOccurrence }) {
  const calculateDaysAndMonthsPassed = (date) => {
    const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
    const now = new Date();
    const totalMonths = differenceInMonths(now, parsedDate);
    const remainderDate = subMonths(now, totalMonths);
    const totalDays = differenceInDays(remainderDate, parsedDate);
    return { months: totalMonths, days: totalDays };
  };

  return (
    <div className="mt-3">
      <h2>Occurrences</h2>
      <ul className="list-group">
        {occurrences.map((occurrence, index) => (
          <li key={index} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <p className="mb-1"><strong>Description:</strong> {occurrence.description}</p>
                <p className="mb-1"><strong>Date:</strong> {occurrence.occurrenceDay}</p>
                <p className="mb-1"><strong>Days Passed:</strong> {differenceInDays(new Date(), parse(occurrence.occurrenceDay, 'dd/MM/yyyy', new Date()))}</p>
                <p className="mb-0">
                  <strong>Months and Days Passed:</strong> {calculateDaysAndMonthsPassed(occurrence.occurrenceDay).months} months and {calculateDaysAndMonthsPassed(occurrence.occurrenceDay).days} days
                </p>
              </div>
              <button className="btn btn-danger" onClick={() => deleteOccurrence(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OccurrenceList;
