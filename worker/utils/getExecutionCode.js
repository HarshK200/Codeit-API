/*
 Data object looks like
 const data = {
    userId: userId,
    answer: answer,
    language: language,
    problem: problem,
    submissionId: submission.id,
  };
*/
// TODO: save the languageComputeCode in database and just send it with the data

export default async function getExecutionCode(data) {
  const language = data.language.toLowerCase();
  const userCode = data.answer;
  const problemEvalCode = data.problem.problemEvalCode[language];
  let finalExecutionCode;

  switch (language) {
    case "javascript":
      finalExecutionCode =
        userCode + // the user solution function
        problemEvalCode + // the function that will evaluate the user function with testcases
        `\nconst testcases = ${JSON.stringify(data.problem.testCases)};\n` + // adding the test cases
        `\nconst result = EvalUserCode(testcases);\nimport fs from "node:fs";\nfs.promises.writeFile("temp/result.json", JSON.stringify(result));`; // the code that finally calls the evalusercode function and writes the output to a result.json
      break;

    case "cpp":
      finalExecutionCode = "#Include <bits/stdc++.h>" + userCode;

    default:
      console.log("Invalid language");
      break;
  }

  return finalExecutionCode;
}
