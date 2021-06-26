"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolver = {
    Query: {
        seeProfile: function (_, _a, _b) {
            var username = _a.username;
            var client = _b.client, loggedInUser = _b.loggedInUser;
            return client.user.findUnique({
                where: {
                    username: username,
                },
                include: {
                    following: true,
                    followers: true,
                },
            });
        },
    },
};
exports.default = resolver;
