"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./route/userRoute"));
const app = (0, express_1.default)();
const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/mongoose-crud";
app.use(express_1.default.json());
app.use("/users", userRoute_1.default);
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
});
