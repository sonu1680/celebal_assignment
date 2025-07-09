"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});
app.get("/", (req, res) => {
    res.send("Hello from the Home Page!");
});
app.get("/about", (req, res) => {
    res.send("This is the About Page.");
});
app.use((req, res) => {
    res.status(404).send("Page not found");
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
