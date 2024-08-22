import fs from "node:fs";

async function generateTempFiles(folderName, executableCode, language) {
  // writing the executablecode to a file => if code executes correctly it writes to temp/result.json
  console.log("generating temp for current run...");
  await fs.promises.mkdir(folderName, { recursive: true });
  try {
    switch (language) {
      case "javascript":
        await fs.promises.writeFile(
          folderName + "/solution.js",
          executableCode,
        );
        break;

      case "cpp":
        await fs.promises.writeFile(
          folderName + "/solution.cpp",
          executableCode,
        );

      default:
        throw new Error("invalid user-code language provided");
    }
  } catch (e) {
    console.log(e);
    await fs.promises.rm(folderName, { recursive: true });
  }
}

async function deleteTempFiles(folderName) {
  try {
    await fs.promises.access(folderName, fs.constants.F_OK);
    console.log("clearing temp from the run...");
    await fs.promises.rm(folderName, { recursive: true });
  } catch (err) {
    console.log(err);
  }
}

export { generateTempFiles, deleteTempFiles };
