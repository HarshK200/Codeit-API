import fs from "node:fs";
import path from "node:path";
/*
Data object looks like
const data = {
  userId: userId,
  answer: answer,
  language: language,
  problem: problem,
  submissionId: submission.id,
};*/

export default async function getExecutionCode(data, folderName) {
  const language = data.language.toLowerCase();
  const userCode = data.answer;
  const problemEvalCode = data.problem.problemEvalCode[language];
  let finalExecutionCode;

  switch (language) {
    case "javascript":
      finalExecutionCode = await getJsExecCode(
        userCode,
        problemEvalCode,
        data,
        folderName,
      );
      break;

    case "cpp":
      finalExecutionCode = await getCppExecCode(
        userCode,
        problemEvalCode,
        data,
        folderName,
      );

    default:
      console.log("Invalid language");
      break;
  }

  return finalExecutionCode;
}

async function getJsExecCode(userCode, problemEvalCode, data, folderName) {
  const mainjsCode = await fs.promises.readFile(
    path.resolve("./lang/main.js"),
    "utf8",
  );
  const finalCode =
    userCode + // the user solution function
    problemEvalCode + // the function that will evaluate the user function with testcases
    `\nconst testcases = ${JSON.stringify(data.problem.testCases)};\n` + // adding the test cases
    mainjsCode + // the main code that calls the evalfunction writes result.json
    `fs.promises.writeFile("${folderName}" + "/result.json", JSON.stringify(result));`;
  return finalCode;
}

async function getCppExecCode(userCode, problemEvalCode, data, folderName) {
  const mainjsCode = await fs.promises.readFile(
    path.resolve("./lang/main.cpp"),
    "utf8",
  );
  const finalCode =
    `#include "./include/structs.cpp"` +
    `\njson jsonStr = json::parse(R"(${JSON.stringify(data.problem.testCases)})");` + // adding the test cases
    userCode +
    problemEvalCode +
    mainjsCode + // the main code that calls the evalfunction writes result.json
    `//TODO: add string to write the result as json in result.json`;

  return finalCode;
}
