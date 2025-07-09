import express from "express";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import path from "path";

import { errorHandler } from "./errorHandler";
import uploadRoutes from "./upload";
import { authenticateJWT, loginHandler } from "./auth";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

interface Product {
  id: string;
  name: string;
  price: number;
}
let products: Product[] = [
  { id: uuidv4(), name: "Wireless Mouse", price: 29.99 },
  { id: uuidv4(), name: "Mechanical Keyboard", price: 89.99 },
  { id: uuidv4(), name: "27-inch Monitor", price: 189.99 },
];

app.post("/login", loginHandler);

app.use("/", uploadRoutes);

app.get("/products", (_req, res) => res.json(products));
app.post("/products", authenticateJWT, (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: uuidv4(), name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.get("/products/:id", authenticateJWT, (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) throw { status: 404, message: "Product not found" };
  res.json(product);
});
app.put("/products/:id", authenticateJWT, (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) throw { status: 404, message: "Product not found" };
  Object.assign(product, req.body);
  res.json(product);
});
app.delete("/products/:id", authenticateJWT, (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) throw { status: 404, message: "Product not found" };
  const deleted = products.splice(index, 1);
  res.json({ message: "Deleted", product: deleted[0] });
});

app.get("/external/products", async (_req, res, next) => {
  try {
    const response = await axios.get(
      "https://fakestoreapi.com/products?limit=5"
    );
    res.json(response.data);
  } catch (err) {
    next({ status: 500, message: "Failed to fetch external products" });
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
