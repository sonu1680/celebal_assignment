import http from "http";
import { handleFileRoutes } from "./routes/fileRoute";

const PORT = process.env.PORT||3000;

const server = http.createServer((req, res) => {
  handleFileRoutes(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
