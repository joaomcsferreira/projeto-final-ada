"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
exports.userRouter = (0, express_1.default)();
exports.userRouter
    .route("/users")
    .get((req, res) => user_controller_1.default.getUsers(req, res));
exports.userRouter
    .route("/user/:id")
    .get((req, res) => user_controller_1.default.getUser(req, res));
exports.userRouter
    .route("/user")
    .post((req, res) => user_controller_1.default.createUser(req, res));
exports.userRouter
    .route("/token")
    .post((req, res) => user_controller_1.default.createToken(req, res));
exports.userRouter
    .route("/login")
    .get((req, res) => user_controller_1.default.login(req, res));
