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
const user_model_1 = __importDefault(require("../models/user.model"));
var userService;
(function (userService) {
    userService.getAll = () => __awaiter(this, void 0, void 0, function* () {
        const users = yield user_model_1.default.findAll();
        return users;
    });
    userService.get = (id) => __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findByPk(id);
        return user;
    });
    userService.getByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ where: { email } });
        return user;
    });
    userService.create = (user) => __awaiter(this, void 0, void 0, function* () {
        const response = yield user_model_1.default.create(user);
        return response;
    });
    function emailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ where: { email } });
            return !!user;
        });
    }
    userService.emailExists = emailExists;
})(userService || (userService = {}));
module.exports = userService;
