"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fileRoute_1 = require("./routes/fileRoute");
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer((req, res) => {
    (0, fileRoute_1.handleFileRoutes)(req, res);
});
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
