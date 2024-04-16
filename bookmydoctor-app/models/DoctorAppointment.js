const mongoose = require('mongoose');

const doctorAppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to the Doctor model
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['BOOKED', 'CANCELLED', 'COMPLETED', 'RESCHEDULED'],
    default: 'BOOKED', 
  },
});

const DoctorAppointment = mongoose.model('DoctorAppointment', doctorAppointmentSchema);

module.exports = DoctorAppointment;
