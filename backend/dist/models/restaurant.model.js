"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../database/db");
const Restaurant = db_1.db.define("restaurant", {
    id: {
        type: sequelize_1.default.DataTypes.UUID,
        defaultValue: sequelize_1.default.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    cuisineType: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    rating: {
        type: sequelize_1.default.FLOAT,
        allowNull: true,
    },
    openingHours: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    hasDelivery: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: true,
    },
    image: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
});
exports.default = Restaurant;
