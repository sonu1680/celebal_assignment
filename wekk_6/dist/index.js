"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
let products = [
    { id: (0, uuid_1.v4)(), name: "Wireless Mouse", price: 29.99 },
    { id: (0, uuid_1.v4)(), name: "Mechanical Keyboard", price: 89.99 },
    { id: (0, uuid_1.v4)(), name: "27-inch Monitor", price: 189.99 },
];
app.post("/products", (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: (0, uuid_1.v4)(), name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
app.get("/products", (_req, res) => {
    res.json(products);
});
app.get("/products/:id", (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (!product)
        return res.status(404).json({ message: "Product not found" });
    res.json(product);
});
app.put("/products/:id", (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (!product)
        return res.status(404).json({ message: "Product not found" });
    const { name, price } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
    res.json(product);
});
app.delete("/products/:id", (req, res) => {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1)
        return res.status(404).json({ message: "Product not found" });
    const deleted = products.splice(index, 1);
    res.json({ message: "Product deleted", product: deleted[0] });
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
