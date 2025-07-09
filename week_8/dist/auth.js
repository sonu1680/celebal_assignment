"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.loginHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || "sknbcjdc";
const dummyUser = {
    username: "admin",
    password: "password123",
};
const loginHandler = (req, res) => {
    const { username, password } = req.body;
    if (username === dummyUser.username && password === dummyUser.password) {
        const token = jsonwebtoken_1.default.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ token });
    }
    res.status(401).json({ message: "Invalid credentials" });
};
exports.loginHandler = loginHandler;
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "Missing Authorization header" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        //@ts-ignore
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.authenticateJWT = authenticateJWT;
