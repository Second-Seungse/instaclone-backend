"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_core_1 = require("apollo-server-core");
exports.default = apollo_server_core_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    seeProfile(username: String!): User\n  }\n"], ["\n  type Query {\n    seeProfile(username: String!): User\n  }\n"])));
var templateObject_1;