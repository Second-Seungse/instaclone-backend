"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolver = {
    Query: {
        seePhotoComments: function (_, _a, _b) {
            var id = _a.id;
            var client = _b.client;
            return client.comment.findMany({
                where: {
                    photoId: id,
                },
                // TODO Pagination skip, take, cursor
                orderBy: {
                    createdAt: "asc",
                },
            });
        },
    },
};
exports.default = resolver;
