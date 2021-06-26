"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Comment: {
        isMine: function (_a, _, _b) {
            var userId = _a.userId;
            var loggedInUser = _b.loggedInUser;
            if (!loggedInUser) {
                return false;
            }
            return userId === loggedInUser.id;
        },
    },
};
