"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_utils_1 = require("../../users/users.utils");
var resolver = {
    Query: {
        seeRoom: users_utils_1.protectedResolver(function (_, _a, _b) {
            var id = _a.id;
            var client = _b.client, loggedInUser = _b.loggedInUser;
            return client.room.findFirst({
                where: {
                    id: id,
                    users: {
                        some: {
                            id: loggedInUser.id,
                        },
                    },
                },
            });
        }),
    },
};
exports.default = resolver;
