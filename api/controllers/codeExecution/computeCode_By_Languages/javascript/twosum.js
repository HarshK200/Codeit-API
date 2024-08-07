const { solution } = require("./solution.js");
const fs = require("node:fs").promises;

async function compute() {
  try {
    let result = solution();
    if (typeof result === "object" && result !== null) {
      result = JSON.stringify(result);
      await fs.writeFile("./temp/result.json", result);
      return;
    }
    console.log(result);
  } catch (e) {
    console.log(e);
    return e;
  }
}

compute();
