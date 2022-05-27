"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function uuidValidateV4(id) {
    return (0, uuid_1.validate)(id) && (0, uuid_1.version)(id) === 4;
}
exports.default = uuidValidateV4;
