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
const restaurant_service_1 = __importDefault(require("../services/restaurant.service"));
var restaurantController;
(function (restaurantController) {
    restaurantController.getRestaurants = (req, res) => __awaiter(this, void 0, void 0, function* () {
        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const restaurants = yield restaurant_service_1.default.getAll(limit);
        res.status(200).json([...restaurants]);
    });
    restaurantController.getRestaurant = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const response = yield restaurant_service_1.default.get(id);
            if (!response)
                throw {
                    code: 404,
                    message: "The restaurant you tried to access does not exist.",
                };
            res.status(200).json(response);
        }
        catch (error) {
            res
                .status((error === null || error === void 0 ? void 0 : error.code) || 500)
                .json({ error: error.message || error.toString() });
        }
    });
    restaurantController.createRestaurant = (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const restaurant = Object.assign(Object.assign({}, req.body), { image });
            if (restaurant.name === "" ||
                restaurant.address === "" ||
                restaurant.phone === "" ||
                restaurant.cuisineType === "" ||
                restaurant.rating === "" ||
                restaurant.openingHours === "" ||
                restaurant.hasDelivy === "")
                throw { code: 400, message: "All fields are required." };
            const restaurantExist = yield restaurant_service_1.default.getByName(restaurant.name);
            if (restaurantExist)
                throw {
                    code: 409,
                    message: "There is already a restaurant with that name.",
                };
            const response = yield restaurant_service_1.default.create(restaurant);
            res.status(201).json(response);
        }
        catch (error) {
            res
                .status((error === null || error === void 0 ? void 0 : error.code) || 500)
                .json({ error: error.message || error.toString() });
        }
    });
    restaurantController.updateRestaurant = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurant = req.body;
            const { id } = req.params;
            if (restaurant.name) {
                const restaurantExist = yield restaurant_service_1.default.getByName(restaurant.name);
                if (restaurantExist && restaurantExist.id != id)
                    throw {
                        code: 409,
                        message: "There is already a restaurant with that name.",
                    };
            }
            const restaurantOld = yield restaurant_service_1.default.get(id);
            const restaurantUpdate = {
                name: restaurant.name || restaurantOld.name,
                address: restaurant.address || restaurantOld.address,
                phone: restaurant.phone || restaurantOld.phone,
                cuisineType: restaurant.cuisineType || restaurantOld.cuisineType,
                rating: restaurant.rating || restaurantOld.rating,
                openingHours: restaurant.openingHours || restaurantOld.openingHours,
                hasDelivery: restaurant.hasDelivery || restaurantOld.hasDelivery,
                image: restaurant.image || restaurantOld.image,
            };
            const [response] = yield restaurant_service_1.default.update(id, restaurantUpdate);
            if (!response)
                throw {
                    code: 404,
                    message: "The restaurant you tried to update doesn't exist.",
                };
            res.status(200).json({ message: "Restaurant updated successfully." });
        }
        catch (error) {
            res
                .status((error === null || error === void 0 ? void 0 : error.code) || 500)
                .json({ error: error.message || error.toString() });
        }
    });
    restaurantController.deleteRestaurant = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const response = yield restaurant_service_1.default.remove(id);
            if (!response)
                throw {
                    code: 404,
                    message: "The restaurant you tried to delete doesn't exist.",
                };
            res.status(200).json({ message: "Restaurant removed successfully." });
        }
        catch (error) {
            res
                .status((error === null || error === void 0 ? void 0 : error.code) || 500)
                .json({ error: error.message || error.toString() });
        }
    });
})(restaurantController || (restaurantController = {}));
module.exports = restaurantController;
