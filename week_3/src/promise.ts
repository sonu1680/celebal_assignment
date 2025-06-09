import { promises as fs } from "fs";

async function readFileContent(): Promise<void> {
  try {
    const data: string = await fs.readFile("./data.txt", "utf8");
    console.log("File content:", data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

readFileContent();
