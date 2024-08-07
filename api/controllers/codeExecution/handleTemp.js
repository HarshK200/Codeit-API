const fs = require("node:fs").promises;
const path = require("node:path");

async function createTempFiles(code, language, problemTitle, testcases) {
  code = code + "\nmodule.exports = { solution }";
  const computeCode = await getComputeCode(language, problemTitle, testcases);
  if (computeCode instanceof Error) {
    console.log("invalid language or problem Title");
  }
  const directoryPath = path.join(__dirname, "temp");

  try {
    await fs.mkdir(directoryPath, { recursive: true });
    await fs.writeFile(path.join(directoryPath, "solution.js"), code);
    await fs.writeFile(path.join(directoryPath, "compute.js"), computeCode);
  } catch (err) {
    console.log(err);
  }
}

async function getComputeCode(language, problemTitle, testcases) {
  let data;
  if (language == "javascript") {
    switch (problemTitle) {
      case "twosum":
        const fileName = "computeCode_By_Languages/javascript/twosum.js";
        const pathToFile = path.join(__dirname, fileName);
        data = await fs.readFile(pathToFile, { encoding: "utf8" });
        data = "const testcases = " + testcases + "\n" + data;
        break;

      default:
        data = "problem compute code not found!";
    }
  } else {
    return new Error("the choosen language is not supported yet!");
  }
  return data;
}

async function deleteTempFiles() {
  fs.rm(__dirname + "/temp", { recursive: true });
}

module.exports = { createTempFiles, deleteTempFiles };
