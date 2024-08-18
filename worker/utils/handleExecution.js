/*
  const data = {
    userId: userId,
    answer: answer,
    language: language,
    problem: problem,
    submissionId: submission.id,
  };
*/
import child_process from "node:child_process";
import fs from "node:fs";

export default function executeCode(data) {
  return new Promise((resolve, reject) => {
    child_process.exec("node temp/solution.js", async (err, stdout, stderr) => {
      // In case of execution err for e.g. Syntax err
      if (err) {
        let testCasesResult = {};
        Object.keys(data.problem.testCases).map((key) => {
          testCasesResult[key] = { passed: false };
        });
        const executionResult = {
          result: JSON.stringify(testCasesResult),
          stdout: stdout,
          stderr: stderr,
          submissionId: data.submissionId,
        };
        // remove temp directory
        await fs.promises.rm("temp", { recursive: true });
        resolve(executionResult);
        return;
      }

      // if no err and code executes successfully: Read the result.json
      let result = await fs.promises.readFile("temp/result.json");
      result = JSON.parse(result);

      let testCasesResult = {};
      Object.keys(data.problem.testCases).map((key) => {
        if (
          Array.isArray(result[key]) &&
          arraysEqual(data.problem.testCases[key].output, result[key])
        ) {
          testCasesResult[key] = {
            passed: true,
            expected_output: data.problem.testCases[key].output,
            user_output: result[key],
          };
        } else {
          testCasesResult[key] = {
            passed: false,
            expected_output: data.problem.testCases[key].output,
            user_output: result[key],
          };
        }
      });
      // remove temp directory
      try {
        await fs.promises.rm("temp", { recursive: true });
      } catch (e) {
        console.log("Err occured during removing temp directory");
      }
      const executionResult = {
        result: JSON.stringify(testCasesResult),
        stdout: stdout,
        stderr: stderr,
        submissionId: data.submissionId,
      };
      // console.log(executionResult);

      resolve(executionResult);
    });
  });
}

// helper function
function arraysEqual(arr1, arr2) {
  try {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((element, index) => element === arr2[index]);
  } catch (e) {
    console.log("Err comparing arrays: ", e);
  }
}
