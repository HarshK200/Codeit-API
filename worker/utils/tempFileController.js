import fs from "node:fs";

async function generateTempFiles(folderName, executableCode, language) {
  // writing the executablecode to a file => if code executes correctly it writes to temp/result.json
  console.log("generating temp for current run...");
  await fs.promises.mkdir(folderName, { recursive: true });
  try {
    if (language === "javascript") {
      await fs.promises.writeFile(folderName + "/solution.js", executableCode);
      return;
    }

    throw new Error("invalid user-code language provided");
  } catch (e) {
    console.log(e);
    await fs.promises.rm(folderName, { recursive: true });
  }
}

async function deleteTempFiles(folderName) {
  try {
    await fs.promises.access(folderName, fs.constants.F_OK);
    await fs.promises.rm(folderName, { recursive: true });
  } catch (err) {
    console.log(err);
  }
}

export { generateTempFiles, deleteTempFiles };
