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
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
var restaurantService;
(function (restaurantService) {
    restaurantService.getAll = (limit) => __awaiter(this, void 0, void 0, function* () {
        const restaurants = yield restaurant_model_1.default.findAll({ limit });
        return restaurants;
    });
    restaurantService.get = (id) => __awaiter(this, void 0, void 0, function* () {
        const restaurant = yield restaurant_model_1.default.findByPk(id);
        return restaurant;
    });
    restaurantService.create = (restaurant) => __awaiter(this, void 0, void 0, function* () {
        const response = yield restaurant_model_1.default.create(restaurant);
        return response;
    });
    restaurantService.update = (id, restaurant) => __awaiter(this, void 0, void 0, function* () {
        const filter = {
            where: { id },
            returing: true,
            plain: true,
        };
        const restaurantUpdate = yield restaurant_model_1.default.update(restaurant, filter);
        return restaurantUpdate;
    });
    restaurantService.remove = (id) => __awaiter(this, void 0, void 0, function* () {
        const filter = { where: { id } };
        const countDeleted = yield restaurant_model_1.default.destroy(filter);
        return countDeleted;
    });
    restaurantService.getByName = (name) => __awaiter(this, void 0, void 0, function* () {
        const restaurant = yield restaurant_model_1.default.findOne({ where: { name } });
        return restaurant;
    });
})(restaurantService || (restaurantService = {}));
module.exports = restaurantService;
