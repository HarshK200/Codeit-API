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

  try {
    if (language === "javascript") {
      finalExecutionCode = await getJsExecCode(
        userCode,
        problemEvalCode,
        data,
        folderName,
      );
      return finalExecutionCode;
    }
    console.log("Invalid language");
    console.log(language);

    return finalExecutionCode;
  } catch (e) {
    console.log(e);
  }
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
