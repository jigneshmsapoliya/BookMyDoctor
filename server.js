const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

mongoose.connect('mongodb+srv://jmsapoliya:Naruto007@cluster0.6rhwk1w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  dbName: 'doctorAppointment',
});

const User = require('./bookmydoctor-app/models/User.js'); 
const Doctor = require('./bookmydoctor-app/models/DoctorModel.js');
const Appointment = require('./bookmydoctor-app/models/DoctorAppointment.js');
const TimeSlot = require('./bookmydoctor-app/models/TimeSlot.js'); 

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    phone: String
    role: String
    gender: String
    bloodType: String
    appointments: [Appointment]
  }

  type Doctor {
    _id: ID!
    firstName: String!
    lastName: String!
    specialization: String!
    hospitalAffiliation: String
    experience: Int!
    education: [String!]!
    insuranceAccepted: [String!]!
    location: Location!
    imgUrl : String
    servicesOffered: [String]
    officeHours: OfficeHours
    aboutMe: String
    appointments: [Appointment]
  }
  type Query {
    users: [User]
    doctors: [Doctor]
    doctor(id: ID!): Doctor
    getTimeSlotsByDoctor(doctorId: ID!): [TimeSlot]
  }
  
  type Appointment {
    _id: ID!
    doctor: Doctor!
    patientName: String!
    email: String!
    phoneNumber: String!
    dateTime: String!
    duration: Int!
    status: AppointmentStatus!
  }

  enum AppointmentStatus {
    BOOKED
    CANCELLED
    COMPLETED
    RESCHEDULED
  }

  type Location {
    address: String!
    city: String!
    state: String!
    country: String!
  }

  type OfficeHours {
    hours: String!
    parking: String
  }
  type TimeSlot {
    _id: ID!
    doctor: Doctor!
    date: String!
    startTime: String!
    duration: Int!
    isBooked: Boolean!
  }

  input DoctorInput {
    firstName: String!
    lastName: String!
    specialization: String!
    hospitalAffiliation: String
    experience: Int!
    education: [String!]!
    insuranceAccepted: [String!]!
    location: LocationInput!
    imgUrl: String
    servicesOffered: [String]
    officeHours: OfficeHoursInput
    aboutMe: String
  }

  input LocationInput {
    address: String!
    city: String!
    state: String!
    country: String!
  }

  input OfficeHoursInput {
    hours: String!
    parking: String
  }

  input CreateAppointmentInput {
    doctorId: ID!
    patientName: String!
    email: String!
    phoneNumber: String!
    dateTime: String!
    duration: Int!
  }
  input TimeSlotInput {
    doctorId: ID!
    date: String!
    startTime: String!
    duration: Int!
    isBooked: Boolean!
  }

  type Mutation {
    registerUser(
      email: String!
      password: String!
      name: String!
      phone: String
      role: String
      gender: String
      bloodType: String
    ): User
  
    loginUser(email: String!, password: String!): User

    registerDoctor(input: DoctorInput!): Doctor

    createDoctor(
      firstName: String!
      lastName: String!
      specialization: String!
      hospitalAffiliation: String
      experience: Int!
      education: [String!]!
      insuranceAccepted: [String!]!
      location: LocationInput!
      imgUrl: String
      servicesOffered: [String]
      officeHours: OfficeHoursInput
      aboutMe: String
    ): Doctor
  
    updateDoctor(
      id: ID!
      firstName: String
      lastName: String
      specialization: String
      hospitalAffiliation: String
      experience: Int
      education: [String]
      insuranceAccepted: [String]
      location: LocationInput
      imgUrl: String
      servicesOffered: [String]
      officeHours: OfficeHoursInput
      aboutMe: String
    ): Doctor
  
    deleteDoctor(id: ID!): Doctor

    createAppointment(input: CreateAppointmentInput!): Appointment!
    cancelAppointment(appointmentId: ID!): Appointment!
    rescheduleAppointment(appointmentId: ID!, newDateTime: String!): Appointment!
  }    
  extend type Mutation {
    addTimeSlot(input: TimeSlotInput!): TimeSlot!
  }
`;

const resolvers = {
  Appointment: {
    status: (parent) => parent.status || 'BOOKED', 
  },
  Query: {
    getTimeSlotsByDoctor: async (_, { doctorId }) => {
      try {
        // Find unbooked time slots by doctorId
        const timeSlots = await TimeSlot.find({ doctor: doctorId, isBooked: false });
  
        return timeSlots;
      } catch (error) {
        console.error('Error fetching time slots:', error);
        throw new Error('Failed to fetch time slots');
      }
    },
    users: async () => {
      const users = await User.find();
      return users;
    },
    doctors: async () => {
      const doctors = await Doctor.find();
      return doctors;
    },
    doctor: async (_, { id }) => {
      try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
          throw new Error('Doctor not found');
        }
        return doctor;
      } catch (error) {
        console.error('Error fetching doctor:', error);
        throw new Error('Failed to fetch doctor');
      }
    }
  },
  Mutation: {
    registerUser: async (_, args) => {
      const user = new User(args);
      await user.save();
      return user;
    },
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email, password });

      if (!user) {
        throw new Error('Invalid credentials');
      }
      const token = generateAuthToken(user);
      return { ...user.toObject(), token };
    },
    registerDoctor: async (_, { input }) => {
      const doctor = new Doctor(input);
      await doctor.save();
      return doctor;
    },
    updateDoctor: async (_, { id, ...args }) => {
      return await Doctor.findByIdAndUpdate(id, args, { new: true });
    },
    deleteDoctor: async (_, { id }) => {
      return await Doctor.findByIdAndDelete(id);
    },
    createAppointment: async (_, { input }) => {
      const { doctorId, dateTime } = input;
  
      // Extract date and startTime from the dateTime
      const [date, startTime] = dateTime.split(' ');
  
      try {
        // Find the corresponding time slot
        const timeSlot = await TimeSlot.findOneAndUpdate(
          { doctor: doctorId, date, startTime, isBooked: false }, // Find the available time slot
          { isBooked: true }, // Update the time slot to mark it as booked
          { new: true } // Return the updated time slot
        );
  
        if (!timeSlot) {
          throw new Error('Time slot not found or already booked');
        }
  
        // Create the appointment
        const appointment = await Appointment.create({
          ...input,
          dateTime,
        });
  
        return appointment;
      } catch (error) {
        console.error('Error creating appointment:', error);
        throw new Error('Failed to create appointment');
      }
    },
    cancelAppointment: async (_, { appointmentId }) => {
      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status: 'CANCELLED' },
        { new: true }
      );
      return appointment;
    },
    rescheduleAppointment: async (_, { appointmentId, newDateTime }) => {
      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { dateTime: newDateTime },
        { new: true }
      );
      return appointment;
    },

    addTimeSlot: async (_, { input }) => {
      try {
        const { doctorId, date, startTime, duration } = input;

        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
          throw new Error('Doctor not found');
        }

        // Create the time slot
        const timeSlot = new TimeSlot({
          doctor: doctorId,
          date,
          startTime,
          duration,
          isBooked: false
        });

        // Save the time slot to the database
        await timeSlot.save();

        return timeSlot;
      } catch (error) {
        console.error('Error adding time slot:', error);
        throw new Error('Failed to add time slot');
      }
    }
  },
};

const generateAuthToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    'j3ms',
    { expiresIn: '1h' }
  );
  return token;
};

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
