"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var schema_1 = require("./schema");
var users_utils_1 = require("./users/users.utils");
var client_1 = __importDefault(require("./client"));
var PORT = process.env.PORT;
var index = fs_1.default.readFileSync("index.html");
var apollo = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: schema_1.resolvers,
    playground: true,
    introspection: true,
    context: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var context;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!ctx.req) return [3 /*break*/, 2];
                    _a = {
                        client: client_1.default
                    };
                    return [4 /*yield*/, users_utils_1.getUser(ctx.req.headers.token)];
                case 1: 
                // * http
                return [2 /*return*/, (_a.loggedInUser = _b.sent(),
                        _a)];
                case 2:
                    context = ctx.connection.context;
                    return [2 /*return*/, {
                            loggedInUser: context.loggedInUser,
                        }];
            }
        });
    }); },
    subscriptions: {
        /**
         * @param {Object} connectionParams An object containing parameters included in the request, such as an authentication token.
         * @param {webSocket} webSocket The connecting or disconnecting WebSocket.
         * @param {ConnectionContext} context Context object for the WebSocket connection. This is not the context object for the associated subscription operation.
         */
        onConnect: function (token) { return __awaiter(void 0, void 0, void 0, function () {
            var loggedInUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token) {
                            throw new Error("You can't listen.");
                        }
                        return [4 /*yield*/, users_utils_1.getUser(token)];
                    case 1:
                        loggedInUser = _a.sent();
                        return [2 /*return*/, {
                                loggedInUser: loggedInUser,
                            }];
                }
            });
        }); },
    },
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
