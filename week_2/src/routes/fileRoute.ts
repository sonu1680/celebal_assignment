import fs from "fs";
import path from "path";
import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";

const FILES_DIR = path.join(__dirname, "..", "files");

if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR);
}

export function handleFileRoutes(req: IncomingMessage, res: ServerResponse) {
  const parsedUrl = new URL(req.url || "", `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const filename = parsedUrl.searchParams.get("filename");
  const filePath = path.join(FILES_DIR, filename || "");

  if (!filename) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    return res.end("Missing filename in query param");
  }

  if (pathname === "/create" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      fs.writeFile(filePath, body, (err) => {
        if (err) {
          res.writeHead(500);
          return res.end("Error creating file");
        }
        res.writeHead(201);
        res.end("File created");
      });
    });
  } else if (pathname === "/read" && req.method === "GET") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("File not found");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });
  } else if (pathname === "/delete" && req.method === "DELETE") {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.writeHead(404);
        return res.end("File not found");
      }
      res.writeHead(200);
      res.end("File deleted");
    });
  } else {
    res.writeHead(404);
    res.end("Route not found");
  }
}
