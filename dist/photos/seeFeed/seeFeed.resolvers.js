"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_utils_1 = require("../../users/users.utils");
var resolver = {
    Query: {
        seeFeed: users_utils_1.protectedResolver(function (_, _a, _b) {
            var offset = _a.offset;
            var client = _b.client, loggedInUser = _b.loggedInUser;
            return client.photo.findMany({
                // * 팔로워 목록에 내 아이디가 있는 유저들의 photo를 찾는다.
                take: 2,
                skip: offset,
                where: {
                    OR: [
                        {
                            user: {
                                followers: {
                                    some: {
                                        id: loggedInUser.id,
                                    },
                                },
                            },
                        },
                        {
                            userId: loggedInUser.id,
                        },
                    ],
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        }),
    },
};
exports.default = resolver;
