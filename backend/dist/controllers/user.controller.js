"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../services/user.service"));
const SECRET = "mysecret";
var userController;
(function (userController) {
    userController.getUsers = (_, res) => __awaiter(this, void 0, void 0, function* () {
        const users = yield user_service_1.default.getAll();
        res.status(200).json([...users]);
    });
    userController.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const response = yield user_service_1.default.get(id);
            if (!response)
                throw {
                    code: 404,
                    message: "The user you tried to access does not exist.",
                };
            res.status(200).json(response);
        }
        catch (error) {
            res
                .status((error === null || error === void 0 ? void 0 : error.code) || 500)
                .json({ error: error.message || error.toString() });
        }
    });
    userController.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const decoded = jsonwebtoken_1.default.verify(token, "mysecret");
            const response = yield user_service_1.default.getByEmail(decoded.email);
            if (!response)
                throw {
                    code: 404,
                    message: "The user you tried to access does not exist.",
                };
            res.status(200).json(response);
        }
        catch (error) {
            res
                .status((error === null || error === void 0 ? void 0 : error.code) || 500)
                .json({ error: error.message || error.toString() });
        }
    });
    userController.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (email === "" || password === "")
                throw {
                    code: 400,
                    message: "All fields are required.",
                };
            const emailExist = yield user_service_1.default.emailExists(email);
            if (emailExist)
                throw {
                    code: 409,
                    message: "There is already a user with that same email.",
                };
            const name = email.split("@")[0];
            const salt = yield bcrypt_1.default.genSalt(10);
            const encryptedPassword = yield bcrypt_1.default.hash(password, salt);
            const response = yield user_service_1.default.create({
                name,
                email,
                password: encryptedPassword,
            });
            res.status(201).json(response);
        }
        catch (error) {
            res
                .status((error === null || error === void 0 ? void 0 : error.code) || 500)
                .json({ error: error.message || error.toString() });
        }
    });
    userController.createToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield user_service_1.default.getByEmail(email);
            if (!user)
                throw { error: 404, message: "User not found." };
            const validatedPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validatedPassword)
                throw {
                    code: 400,
                    message: "The password you entered is incorrect. Please try again or reset your password if needed.",
                };
            const token = jsonwebtoken_1.default.sign({
                email: email.toLocaleLowerCase(),
            }, SECRET, {
                expiresIn: "24h",
            });
            res.status(201).json({ token });
        }
        catch (error) {
            res
                .status((error === null || error === void 0 ? void 0 : error.code) || 500)
                .json({ error: error.message || error.toString() });
        }
    });
})(userController || (userController = {}));
module.exports = userController;
