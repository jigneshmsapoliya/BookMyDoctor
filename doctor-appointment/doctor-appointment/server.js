const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0.n5ukthb.mongodb.net/doctorappointment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./bookmydoctor-app/models/User.js'); 

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
`;

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
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
