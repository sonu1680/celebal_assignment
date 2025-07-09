import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the Home Page!");
});

app.get("/about", (req: Request, res: Response) => {
  res.send("This is the About Page.");
});

app.use((req: Request, res: Response) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
