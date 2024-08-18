import fs from "node:fs";
import path from "node:path";

export default async function getJsExecutionCode() {
  // const testcases = ${JSON.stringify(data.problem.testCases)};
  let jsExecutionCode = await fs.promises.readFile(
    path.resolve("lang/javascript/toAppend.js"),
    "utf8",
  );
  return jsExecutionCode;
}
