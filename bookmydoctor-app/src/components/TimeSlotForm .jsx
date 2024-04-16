import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';


const ADD_TIME_SLOT = gql`
  mutation AddTimeSlot($input: TimeSlotInput!) {
    addTimeSlot(input: $input) {
      _id
      doctor {
        _id
      }
      date
      startTime
      duration
      isBooked
    }
  }
`;

const TimeSlotForm = () => {
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(30); // Default duration
  const [isBooked, setIsBooked] = useState(false); // Default isBooked

  const [addTimeSlot] = useMutation(ADD_TIME_SLOT);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTimeSlot({
        variables: {
          input: {
            doctorId,
            date,
            startTime,
            duration,
            isBooked
          }
        }
      });

      // Clear form fields after submission
      setDoctorId('');
      setDate('');
      setStartTime('');
      setDuration(30);
      setIsBooked(false);

      // Optionally, display a success message to the user
      console.log('Time slot added successfully');
    } catch (error) {
      console.error('Error adding time slot:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="container-lg mt-5 mb-4">
      
      <div className="row justify-content-center">
        <div className="col-lg-7 mt-4">
        <h1 className="mb-4">Add Time slot for the doctor</h1>
          <form onSubmit={handleSubmit} className="bg-gradient p-5 rounded shadow-lg">
            <div className="form-group mb-3">
              <label className="mb-2 px-3 py-2">Doctor ID:</label>
              <input type="text" className="form-control" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
            </div>
            <div className="form-group mb-3">
              <label className="mb-2 px-3 py-2">Date:</label>
              <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="form-group mb-3">
              <label className="mb-2 px-3 py-2">Start Time:</label>
              <input type="time" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="form-group mb-3">
              <label className="mb-2 px-3 py-2">Duration (minutes):</label>
              <input type="number" className="form-control" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} />
            </div>
            {/* <div className="form-group mb-3 px-3 py-2">
              <div className="form-check ">
                <input type="checkbox" className="form-check-input " checked={isBooked} onChange={(e) => setIsBooked(e.target.checked)} />
                <label className="form-check-label">Is Booked</label>
              </div>
            </div> */}
            <button type="submit" className="btn btn-primary">Add Time Slot</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotForm;
