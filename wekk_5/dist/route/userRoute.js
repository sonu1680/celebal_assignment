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
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../model/userModel");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new userModel_1.User(req.body);
        yield user.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ message: "Error creating user", error: err });
    }
}));
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.User.find();
    res.json(users);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user)
            return res.status(404).send("User not found");
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ message: "Error updating user", error: err });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userModel_1.User.findByIdAndDelete(req.params.id);
        if (!result)
            return res.status(404).send("User not found");
        res.send("User deleted");
    }
    catch (err) {
        res.status(400).json({ message: "Error deleting user", error: err });
    }
}));
exports.default = router;
