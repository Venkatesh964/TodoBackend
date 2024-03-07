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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const zod_1 = __importDefault(require("zod"));
const config_1 = __importDefault(require("../config"));
const prisma = new client_1.PrismaClient();
const signupSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("working");
        const { success } = signupSchema.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                msg: "incorrect format"
            });
        }
        const user = yield prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password
            }
        });
        const token = jsonwebtoken_1.default.sign({
            id: user.id
        }, config_1.default);
        return res.status(200).json({
            token
        });
    }
    catch (err) {
        return res.status(403).json({
            err
        });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user1 = yield prisma.user.findFirst({
            where: {
                username: req.body.username,
                password: req.body.password
            },
        });
        if (!user1) {
            return res.json({
                msg: "user doesn't exists"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user1.id }, config_1.default);
        return res.status(200).json({
            token
        });
    }
    catch (err) {
        return res.status(403).json({
            msg: err
        });
    }
}));
exports.default = router;
