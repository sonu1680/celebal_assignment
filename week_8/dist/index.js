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
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("./errorHandler");
const upload_1 = __importDefault(require("./upload"));
const auth_1 = require("./auth");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
let products = [
    { id: (0, uuid_1.v4)(), name: "Wireless Mouse", price: 29.99 },
    { id: (0, uuid_1.v4)(), name: "Mechanical Keyboard", price: 89.99 },
    { id: (0, uuid_1.v4)(), name: "27-inch Monitor", price: 189.99 },
];
app.post("/login", auth_1.loginHandler);
app.use("/", upload_1.default);
app.get("/products", (_req, res) => res.json(products));
app.post("/products", auth_1.authenticateJWT, (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: (0, uuid_1.v4)(), name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
app.get("/products/:id", auth_1.authenticateJWT, (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (!product)
        throw { status: 404, message: "Product not found" };
    res.json(product);
});
app.put("/products/:id", auth_1.authenticateJWT, (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (!product)
        throw { status: 404, message: "Product not found" };
    Object.assign(product, req.body);
    res.json(product);
});
app.delete("/products/:id", auth_1.authenticateJWT, (req, res) => {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1)
        throw { status: 404, message: "Product not found" };
    const deleted = products.splice(index, 1);
    res.json({ message: "Deleted", product: deleted[0] });
});
app.get("/external/products", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://fakestoreapi.com/products?limit=5");
        res.json(response.data);
    }
    catch (err) {
        next({ status: 500, message: "Failed to fetch external products" });
    }
}));
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
