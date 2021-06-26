"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
// TODO Like 타입이 꼭 필요한지 다시 검증해보자
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Photo {\n    id: Int!\n    user: User!\n    file: String!\n    caption: String\n    likes: Int!\n    commentNumber: Int!\n    comments: [Comment]\n    hashtags: [Hashtag]\n    isMine: Boolean!\n    isLiked: Boolean!\n    createdAt: String!\n    updatedAt: String!\n  }\n  type Hashtag {\n    id: Int!\n    hashtag: String!\n    photos(page: Int!): [Photo]\n    totalPhotos: Int!\n    createdAt: String!\n    updatedAt: String!\n  }\n  type Like {\n    id: Int!\n    photo: Photo!\n    createdAt: String!\n    updatedAt: String!\n  }\n"], ["\n  type Photo {\n    id: Int!\n    user: User!\n    file: String!\n    caption: String\n    likes: Int!\n    commentNumber: Int!\n    comments: [Comment]\n    hashtags: [Hashtag]\n    isMine: Boolean!\n    isLiked: Boolean!\n    createdAt: String!\n    updatedAt: String!\n  }\n  type Hashtag {\n    id: Int!\n    hashtag: String!\n    photos(page: Int!): [Photo]\n    totalPhotos: Int!\n    createdAt: String!\n    updatedAt: String!\n  }\n  type Like {\n    id: Int!\n    photo: Photo!\n    createdAt: String!\n    updatedAt: String!\n  }\n"])));
var templateObject_1;
