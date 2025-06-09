import { promises as fs } from "fs";

async function readFileAsync(): Promise<void> {
  try {
    const data: string = await fs.readFile("./data.txt", "utf8");
    console.log("File content:", data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error reading file:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
  }
}

readFileAsync();
