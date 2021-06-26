"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var fs_1 = __importDefault(require("fs"));
var apollo_server_express_1 = require("apollo-server-express");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n\n  # This \"Book\" type defines the queryable fields for every book in our data source.\n  type Book {\n    title: String\n    author: String\n  }\n\n  # The \"Query\" type is special: it lists all of the available queries that\n  # clients can execute, along with the return type for each. In this\n  # case, the \"books\" query returns an array of zero or more Books (defined above).\n  type Query {\n    books: [Book]\n  }\n"], ["\n  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n\n  # This \"Book\" type defines the queryable fields for every book in our data source.\n  type Book {\n    title: String\n    author: String\n  }\n\n  # The \"Query\" type is special: it lists all of the available queries that\n  # clients can execute, along with the return type for each. In this\n  # case, the \"books\" query returns an array of zero or more Books (defined above).\n  type Query {\n    books: [Book]\n  }\n"])));
var books = [
    {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
    },
    {
        title: "Jurassic Park",
        author: "Michael Crichton",
    },
];
var resolvers = {
    Query: {
        books: function () { return books; },
    },
};
var PORT = process.env.PORT;
var index = fs_1.default.readFileSync("index.html");
var apollo = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    playground: true,
    introspection: true,
});
var app = express_1.default();
app.get("/", function (req, res) {
    if (req.method !== "POST") {
        res.writeHead(200);
        res.write(index);
        res.end();
    }
});
app.use(morgan_1.default("tiny"));
app.use("/static", express_1.default.static("uploads"));
apollo.applyMiddleware({ app: app });
var httpServer = http_1.default.createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, function () {
    console.log("\uD83D\uDE80\uD83D\uDE06 Server is running on http://127.0.0.1:" + PORT + "/ \u2705");
});
var templateObject_1;
