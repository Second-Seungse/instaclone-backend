"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolver = {
    Query: {
        searchPhotos: function (_, _a, _b) {
            var keyword = _a.keyword;
            var client = _b.client;
            return client.photo.findMany({
                where: {
                    caption: {
                        startsWith: keyword,
                    },
                },
            });
        },
    },
};
exports.default = resolver;
