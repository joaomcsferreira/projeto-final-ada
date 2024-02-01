"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const storage = multer_1.default.diskStorage({
    destination: (_, __, cb) => cb(null, "./images"),
    filename: (_, file, cb) => {
        const { originalname } = file;
        const auxArray = originalname.split(".");
        const extension = auxArray[1];
        const nameHex = crypto_1.default.randomBytes(64).toString("hex");
        cb(null, `${nameHex}_${Date.now()}.${extension}`);
    },
});
exports.uploadImage = (0, multer_1.default)({ storage }).single("image");
