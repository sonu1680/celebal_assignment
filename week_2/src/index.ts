import http from "http";
import { routeHandler } from "./route/fileRoute";

const PORT = 3000;

const server = http.createServer((req, res) => {
  routeHandler(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
