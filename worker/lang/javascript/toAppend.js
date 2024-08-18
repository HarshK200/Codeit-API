// NOTE: assuming ```testcases Object``` are appended beforehand
let result = {};
Object.keys(testcases).map((key) => {
  result[key] = solution(testcases[key].nums);
});

import fs from "node:fs";
fs.promises.writeFile("temp/result.json", JSON.stringify(result));
