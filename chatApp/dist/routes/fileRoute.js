"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileRoutes = handleFileRoutes;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const FILES_DIR = path_1.default.join(__dirname, "..", "files");
if (!fs_1.default.existsSync(FILES_DIR)) {
    fs_1.default.mkdirSync(FILES_DIR);
}
function handleFileRoutes(req, res) {
    const parsedUrl = new url_1.URL(req.url || "", `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const filename = parsedUrl.searchParams.get("filename");
    const filePath = path_1.default.join(FILES_DIR, filename || "");
    if (!filename) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Missing filename in query param");
    }
    if (pathname === "/create" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            fs_1.default.writeFile(filePath, body, (err) => {
                if (err) {
                    res.writeHead(500);
                    return res.end("Error creating file");
                }
                res.writeHead(201);
                res.end("File created");
            });
        });
    }
    else if (pathname === "/read" && req.method === "GET") {
        fs_1.default.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end("File not found");
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(data);
        });
    }
    else if (pathname === "/delete" && req.method === "DELETE") {
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404);
                return res.end("File not found");
            }
            res.writeHead(200);
            res.end("File deleted");
        });
    }
    else {
        res.writeHead(404);
        res.end("Route not found");
    }
}
