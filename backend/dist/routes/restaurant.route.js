"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const express_1 = __importDefault(require("express"));
const restaurant_controller_1 = __importDefault(require("../controllers/restaurant.controller"));
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const multer_1 = require("../utils/multer");
exports.restaurantRouter = (0, express_1.default)();
exports.restaurantRouter
    .route("/restaurants")
    .get((req, res) => restaurant_controller_1.default.getRestaurants(req, res));
exports.restaurantRouter
    .route("/restaurant/:id")
    .get((req, res) => restaurant_controller_1.default.getRestaurant(req, res));
exports.restaurantRouter
    .route("/restaurant")
    .post(user_middleware_1.default, multer_1.uploadImage, (req, res) => restaurant_controller_1.default.createRestaurant(req, res));
exports.restaurantRouter
    .route("/restaurant/:id")
    .put(user_middleware_1.default, multer_1.uploadImage, (req, res) => restaurant_controller_1.default.updateRestaurant(req, res));
exports.restaurantRouter
    .route("/restaurant/:id")
    .delete(user_middleware_1.default, (req, res) => restaurant_controller_1.default.deleteRestaurant(req, res));
