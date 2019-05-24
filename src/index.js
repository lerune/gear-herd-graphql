const express               = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('./config');

const { User } = require('./models');
  
const typeDefs = gql`
    type User {
        email: String!
        name: String!
        profession: String!
    }
    type Query {
        getUsers: [User]
    }
    type Mutation {
        addUser(name: String!, email: String!, profession: String!): User
    }
`;

const resolvers = {
    Query: {
        getUsers: async () => await User.find({}).exec()
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                let response = await User.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);