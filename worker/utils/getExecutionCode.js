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

import getJsExecutionCode from "../lang/javascript/main.js";

export default async function getExecutionCode(data) {
  const language = data.language.toLowerCase();
  const userCode = data.answer;
  let finalExecutionCode;

  switch (language) {
    case "javascript":
      finalExecutionCode =
        userCode +
        `const testcases = ${JSON.stringify(data.problem.testCases)};` +
        await getJsExecutionCode();
      break;

    default:
      console.log("Invalid language");
      break;
  }

  return finalExecutionCode;
}
