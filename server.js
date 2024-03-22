const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://jmsapoliya:Naruto007@cluster0.6rhwk1w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
dbName:'doctorAppointment',  
//useNewUrlParser: true,
  //useUnifiedTopology: true,
});

const User = require('./bookmydoctor-app/models/User.js'); 
const Doctor = require('./bookmydoctor-app/models/DoctorModel.js');

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
    appointments: [ID]
  }

  type Query {
    users: [User]
    doctors: [Doctor]
    doctor(id: ID!): Doctor
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
`;

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    doctors: async ()=>{
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
      return user;
    },
  },
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
