"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCors = exports.log = void 0;
const log = (req, _, next) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${req.method} ${req.url}`;
    console.log(logMessage);
    next();
};
exports.log = log;
const CustomCors = (_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
    next();
};
exports.CustomCors = CustomCors;
