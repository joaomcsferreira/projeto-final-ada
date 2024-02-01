"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const permission = (req, res, next) => {
    const token = req.headers.authorization;
    const SECRET = "mysecret";
    jsonwebtoken_1.default.verify(token, SECRET, (err) => {
        if (err) {
            return res.status(401).json({ error: "You don't have authorization." });
        }
        return next();
    });
};
exports.default = permission;
