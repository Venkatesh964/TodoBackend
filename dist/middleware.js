"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
function authMiddleware(req, res, next) {
    try {
        const header = req.headers["authorization"];
        //console.log(header);
        const token = header.split(" ")[1];
        if (!token) {
            req.json({
                msg: "token is invalid"
            });
        }
        const decode = jsonwebtoken_1.default.verify(token, config_1.default);
        req.body.id = decode.id;
        next();
    }
    catch (err) {
        return res.json({
            err
        });
    }
}
exports.default = authMiddleware;
