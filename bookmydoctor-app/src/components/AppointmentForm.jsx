import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const GET_TIME_SLOTS_BY_DOCTOR = gql`
  query GetTimeSlotsByDoctor($doctorId: ID!) {
    getTimeSlotsByDoctor(doctorId: $doctorId) {
      _id
      date
      startTime
      duration
    }
  }
`;

const GET_DOCTOR = gql`
  query GetDoctor($id: ID!) {
    doctor(id: $id) {
      _id
      firstName
      lastName
      specialization
      hospitalAffiliation
      experience
      education
      insuranceAccepted
      location {
        address
        city
        state
        country
      }
      imgUrl
      servicesOffered
      officeHours {
        hours
        parking
      }
      aboutMe
    }
  }
`;

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      _id
      dateTime
      duration
      status
    }
  }
`;

const AppointmentForm = () => {
  const { doctorId } = useParams();

  const [dateTime, setDateTime] = useState('');
  const [duration, setDuration] = useState('');
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const { loading: doctorLoading, error: doctorError, data: doctorData } = useQuery(GET_DOCTOR, {
    variables: { id: doctorId },
  });

  const { loading, error, data } = useQuery(GET_TIME_SLOTS_BY_DOCTOR, {
    variables: { doctorId },
  });

  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createAppointment({
        variables: {
          input: {
            doctorId,
            patientName,
            email,
            phoneNumber,
            dateTime: selectedTimeSlot.date + ' ' + selectedTimeSlot.startTime,
            duration: parseInt(duration),
          },
        },
      });

      console.log('Created appointment:', data.createAppointment);
      // Show success toast
    toast.success('Appointment created successfully');

    // Redirect to home page
    window.location.href = '/';
      setDateTime('');
      setDuration('');
      setPatientName('');
      setEmail('');
      setPhoneNumber('');
      setSelectedTimeSlot(null);
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleSelectTimeSlot = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setDateTime(timeSlot.date + 'T' + timeSlot.startTime);
    setDuration(timeSlot.duration);
  };

  if (doctorError) return <p className="text-red-500">Error: {doctorError.message}</p>;
  if (doctorLoading) return <p>Loading doctor details...</p>;

  if (!doctorData || !doctorData.doctor) return null;

  const { doctor } = doctorData;

  return (
    <div className="container mx-auto mt-5 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md">
      <div className="flex justify-center items-center flex-col mb-4">
        <img src={doctor.imgUrl} alt={`${doctor.firstName} ${doctor.lastName}`} className="rounded-full mb-2" style={{ width: '150px', height: '150px' }} />
        <h3 className="text-xl font-semibold">{doctor.firstName} {doctor.lastName}</h3>
        <h4 className="text-lg">Address</h4>
        <p>{doctor.location.address}, {doctor.location.city}, {doctor.location.state}, {doctor.location.country}</p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input style={{ display: 'none' }} type="text" value={doctorId} readOnly className="hidden" />
        <label className="text-lg font-semibold">
          <span>Patient Name:</span>
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="block w-full mt-1 p-2 border rounded" />
        </label>
        <label className="text-lg font-semibold">
          <span>Email:</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full mt-1 p-2 border rounded" />
        </label>
        <label className="text-lg font-semibold">
          <span>Phone Number:</span>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="block w-full mt-1 p-2 border rounded" />
        </label>
        <label className="text-lg font-semibold">
          <span>Select Time Slot:</span>
          <select value={selectedTimeSlot ? JSON.stringify(selectedTimeSlot) : ''} onChange={(e) => handleSelectTimeSlot(JSON.parse(e.target.value))} className="block w-full mt-1 p-2 border rounded">
            {data && data.getTimeSlotsByDoctor && data.getTimeSlotsByDoctor.length > 0 ? (
              <>
                <option value="">Select a time slot</option>
                {data.getTimeSlotsByDoctor.map(timeSlot => (
                  <option key={timeSlot._id} value={JSON.stringify(timeSlot)}>
                    {timeSlot.date} - {timeSlot.startTime}
                  </option>
                ))}
              </>
            ) : (
              <option value="" disabled>No slots available</option>
            )}
          </select>
        </label>
        <label className="text-lg font-semibold">
          <span>Duration (minutes):</span>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} readOnly className="block w-full mt-1 p-2 border rounded" />
        </label>
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded-lg mt-4">Submit</button>
      </form>
    </div>
  );
  
};

export default AppointmentForm;
