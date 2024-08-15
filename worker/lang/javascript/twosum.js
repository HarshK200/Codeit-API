export default function getExecutionCode(data) {
  //TODO: check which language it is and then use attach the code accordingly
  const codeToAppend = `
const testcases = ${JSON.stringify(data.problem.testCases)};
let result = {};
Object.keys(testcases).map((key) => {
  result[key] = solution(testcases[key].nums);
});

import fs from "node:fs";
fs.promises.writeFile("temp/result.json", JSON.stringify(result))`;

  let executableCode = data.answer + codeToAppend;
  return executableCode;
}
