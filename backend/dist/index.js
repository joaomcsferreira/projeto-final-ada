"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./database/db");
const restaurant_route_1 = require("./routes/restaurant.route");
const user_route_1 = require("./routes/user.route");
const log_middleware_1 = require("./middlewares/log.middleware");
const app = (0, express_1.default)();
const PORT = 7342;
app.use(express_1.default.json());
db_1.db.sync();
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
app.use((0, cors_1.default)());
app.use(log_middleware_1.CustomCors);
app.get("/", (_, response) => response.send({ version: "1.0.0" }));
// app.use(log)
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use(express_1.default.json({ limit: "10mb" }));
app.use("/", restaurant_route_1.restaurantRouter);
app.use("/", user_route_1.userRouter);
