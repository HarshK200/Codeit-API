//Write your code here
function solution(nums) {
	console.log("test")
  return {"test": "test"};
}


const testcases = {"0":{"nums":[2,7,11,15],"target":9},"1":{"nums":[3,2,4],"target":6},"2":{"nums":[3,3],"target":6}};
let result = {};
Object.keys(testcases).map((key) => {
  result[key] = solution(testcases[key].nums);
});

import fs from "node:fs";
fs.promises.writeFile("temp/result.json", JSON.stringify(result))