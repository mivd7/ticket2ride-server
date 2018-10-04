"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const ttl = 3600 * 4;
exports.secret = process.env.JWT_SECRET || '9u8nnjksfdt98*(&*%T$#hsfjk';
exports.sign = (data) => jwt.sign(data, exports.secret, { expiresIn: ttl });
exports.verify = (token) => jwt.verify(token, exports.secret);
//# sourceMappingURL=jwt.js.map