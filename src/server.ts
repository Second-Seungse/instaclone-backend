require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import fs from "fs";
import { ApolloServer, gql } from "apollo-server-express";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const PORT = process.env.PORT;
const index = fs.readFileSync("index.html");
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});
const app = express();
app.get("/", (req, res) => {
  if (req.method !== "POST") {
    res.writeHead(200);
    res.write(index);
    res.end();
  }
});
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀😆 Server is running on http://127.0.0.1:${PORT}/ ✅`);
});
