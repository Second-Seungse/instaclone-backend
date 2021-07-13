require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import fs from "fs";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.PORT;
const index = fs.readFileSync("index.html");
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  playground: true,
  introspection: true,
  context: async (ctx) => {
    if (ctx.req) {
      // * http
      return {
        client,
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      // * websocket
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    /**
     * @param {Object} connectionParams An object containing parameters included in the request, such as an authentication token.
     * @param {webSocket} webSocket The connecting or disconnecting WebSocket.
     * @param {ConnectionContext} context Context object for the WebSocket connection. This is not the context object for the associated subscription operation.
     */
    onConnect: async (token) => {
      if (!token) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
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
app.use(graphqlUploadExpress());
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀😆 Server is running on http://127.0.0.1:${PORT}/ ✅`);
});
