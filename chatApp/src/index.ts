import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(express.json());

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


app.post("/products", (req: Request, res: Response) => {
  const { name, price } = req.body;
  const newProduct: Product = { id: uuidv4(), name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/products", (_req: Request, res: Response) => {
  res.json(products);
});

app.get("/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

app.put("/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, price } = req.body;
  product.name = name || product.name;
  product.price = price || product.price;
  res.json(product);
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });

  const deleted = products.splice(index, 1);
  res.json({ message: "Product deleted", product: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
