import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

app.get("/read-file", (_req: Request, res: Response) => {
  const filePath = path.join(__dirname, "..", "data.txt"); 

  fs.readFile(
    filePath,
    "utf8",
    (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error("Error reading file:", err.message);
        return res.status(500).json({ error: "Failed to read file" });
      }

      res.send(`<pre>${data}</pre>`);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
