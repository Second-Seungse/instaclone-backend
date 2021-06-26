"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
// * totalFollowing, totalFollowers 등 DB에 없는 값을 조회하는경우 resolver를 찾아 참조한다.
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    id: Int!\n    firstName: String!\n    lastName: String\n    username: String!\n    email: String!\n    bio: String\n    avatar: String\n    photos: [Photo]\n    following: [User]\n    followers: [User]\n    totalFollowing: Int!\n    totalFollowers: Int!\n    isMe: Boolean!\n    isFollowing: Boolean!\n    createdAt: String!\n    updatedAt: String!\n  }\n"], ["\n  type User {\n    id: Int!\n    firstName: String!\n    lastName: String\n    username: String!\n    email: String!\n    bio: String\n    avatar: String\n    photos: [Photo]\n    following: [User]\n    followers: [User]\n    totalFollowing: Int!\n    totalFollowers: Int!\n    isMe: Boolean!\n    isFollowing: Boolean!\n    createdAt: String!\n    updatedAt: String!\n  }\n"])));
var templateObject_1;
