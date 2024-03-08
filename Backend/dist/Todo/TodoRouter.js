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
const express_1 = require("express");
const router = (0, express_1.Router)();
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const prisma = new client_1.PrismaClient();
const middleware_1 = __importDefault(require("../middleware"));
const todoSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    completed: zod_1.default.boolean().optional()
});
const updateSchema = zod_1.default.object({
    description: zod_1.default.string().optional(),
    completed: zod_1.default.boolean().optional(),
});
router.post("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = todoSchema.safeParse(req.body);
        if (!success) {
            return res.status(403).json({
                msg: "incorrect formats"
            });
        }
        const user = yield prisma.todo.create({
            data: {
                title: req.body.title,
                userId: req.body.id,
                description: req.body.description,
                completed: req.body.completed
            }
        });
        return res.status(200).json({
            msg: "todo created successfully"
        });
    }
    catch (err) {
        return res.status(403).send(err);
    }
}));
router.get("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("not working");
        const response = yield prisma.todo.findMany({
            where: {
                userId: req.body.id
            }
        });
        //const response=await prisma.todo.findMany();
        return res.status(200).json({
            todos: response
        });
    }
    catch (err) {
        return res.status(403).json({
            error: err
        });
    }
}));
router.put("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = updateSchema.safeParse(req.body);
        console.log("working");
        if (!success) {
            return res.status(411).json({ msg: "invalid inputs" });
        }
        const updateUser = yield prisma.todo.update({
            where: {
                title: req.body.title,
            },
            data: {
                description: req.body.description || undefined,
                completed: req.body.completed || undefined
            },
        });
        return res.json({
            msg: updateUser
        });
    }
    catch (err) {
        return res.json({
            msg: err
        });
    }
}));
exports.default = router;
