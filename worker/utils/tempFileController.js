import fs from "node:fs";

async function generateTempFiles(executableCode) {
  // writing the executablecode to a file => if code executes correctly it writes to temp/result.json
  await fs.promises.mkdir("temp", { recursive: false });
  try {
    await fs.promises.writeFile("temp/solution.js", executableCode);
  } catch (e) {
    console.log(e);
    await fs.promises.rm("temp", { recursive: true });
  }
}

export { generateTempFiles };
