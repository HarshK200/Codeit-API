//Write your code here
function solution(nums, target) {
  
}function EvalUserCode(testcases) {
  let result = {};
  Object.keys(testcases).map((key) => {
    result[key] = solution(testcases[key].nums, testcases[key].target);
  })
return result;
}

const testcases = {"0":{"nums":[2,7,11,15],"output":[0,1],"target":9},"1":{"nums":[3,2,4],"output":[1,2],"target":6},"2":{"nums":[3,3],"output":[0,1],"target":6}};
const result = EvalUserCode(testcases);
import fs from "node:fs";
fs.promises.writeFile("temp/c11e9a37-fb1e-4af9-aba6-79aa12101516" + "/result.json", JSON.stringify(result));