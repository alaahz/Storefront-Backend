"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var tokenSecret = process.env.TOKEN_SECRET;
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        var decode = jsonwebtoken_1.default.verify(token, tokenSecret);
        next();
    }
    catch (err) {
        res.status(401).json("Access denied, invalid token, ".concat(err));
        return;
    }
};
exports.verifyAuthToken = verifyAuthToken;
