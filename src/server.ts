const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "bebe",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen(process.env.PORT || 4000)
  .then(() => console.log("Server is running on http://localhost:4000/"));