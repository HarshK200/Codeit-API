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

export default async function executeCode(data, folderName) {
  switch (data.language) {
    case "javascript":
      return await executeJsCode(data, folderName);

    default:
      console.log("Invalid language");
      break;
  }
}

function executeJsCode(data, folderName) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      `node ${folderName}/solution.js`,
      async (err, stdout, stderr) => {
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
            stdErrType: "Runtime Error",
            submissionId: data.submissionId,
          };
          resolve(executionResult);
          return;
        }

        // if no err and code executes successfully: Read the result.json
        let result = await fs.promises.readFile(folderName + "/result.json");
        result = JSON.parse(result);

        // Evaluating the code after execution
        let testCasesResult = {};
        try {
          Object.keys(data.problem.testCases).map((key) => {
            if (Object.keys(result).length === 0) {
              testCasesResult[key] = {
                passed: false,
                expected_output: data.problem.testCases[key].output,
                user_output: "null",
              };
              return;
            }
            if (Array.isArray(result[key])) {
              testCasesResult[key] = {
                passed: arraysEqual(
                  data.problem.testCases[key].output,
                  result[key],
                ),
                expected_output: data.problem.testCases[key].output,
                user_output: result[key],
              };
              return;
            }
            testCasesResult[key] = {
              passed: data.problem.testCases[key].output === result[key],
              expected_output: data.problem.testCases[key].output,
              user_output: result[key],
            };
          });
        } catch (e) {
          console.log("Error occured during eval after execution");
          const executionResult = {
            result: JSON.stringify({
              execution_err:
                "some err occured during eval\nErr: malformed problem\nPlease check the UserEvalFunction written during problem creation",
            }),
            stdout: stdout,
            stderr: stderr,
            submissionId: data.submissionId,
          };
          resolve(executionResult);
          return;
        }

        const executionResult = {
          result: JSON.stringify(testCasesResult),
          stdout: stdout,
          stderr: stderr,
          submissionId: data.submissionId,
        };

        resolve(executionResult);
      },
    );
  });
  // helper function
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((element, index) => element === arr2[index]);
  }
}
