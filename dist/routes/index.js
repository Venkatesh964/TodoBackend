"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const TodoRouter_1 = __importDefault(require("../Todo/TodoRouter"));
const user_1 = __importDefault(require("../Todo/user"));
route.use("/todo", TodoRouter_1.default);
route.use("/user", user_1.default);
exports.default = route;
