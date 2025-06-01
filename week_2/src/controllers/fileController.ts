import fs from "fs";
import path from "path";
import { IncomingMessage, ServerResponse } from "http";
import { filesDir } from "../utils/path.js";

export const handleReadFile = (res: ServerResponse, fileName: string) => {
  const filePath = path.join(filesDir, fileName);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    }
  });
};

export const handleCreateFile = (
  req: IncomingMessage,
  res: ServerResponse,
  fileName: string
) => {
  const filePath = path.join(filesDir, fileName);

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    fs.writeFile(filePath, body, (err) => {
      if (err) {
        res.writeHead(500);
        res.end("Failed to create file");
      } else {
        res.writeHead(201);
        res.end("File created successfully");
      }
    });
  });
};

export const handleDeleteFile = (res: ServerResponse, fileName: string) => {
  const filePath = path.join(filesDir, fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found or cannot be deleted");
    } else {
      res.writeHead(200);
      res.end("File deleted successfully");
    }
  });
};
