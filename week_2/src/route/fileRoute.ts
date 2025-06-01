import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import fs from "fs";
import { filesDir } from "../utils/path.js";
import { handleCreateFile, handleDeleteFile, handleReadFile } from "../controllers/fileController.js";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url || "", true);
  const fileName = (parsedUrl.query.name as string) || "default.txt";

  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
  }

  if (req.method === "GET" && parsedUrl.pathname === "/read") {
    return handleReadFile(res, fileName);
  } else if (req.method === "POST" && parsedUrl.pathname === "/create") {
    return handleCreateFile(req, res, fileName);
  } else if (req.method === "DELETE" && parsedUrl.pathname === "/delete") {
    return handleDeleteFile(res, fileName);
  } else {
    res.writeHead(404);
    res.end("Route not found");
  }
};
