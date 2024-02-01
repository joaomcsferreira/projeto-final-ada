"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../database/db");
const User = db_1.db.define("user", {
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
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
});
exports.default = User;
