const { PrismaClient } = require("@prisma/client");
const { runCode } = require("./codeExecution/handleRun.js");
const prisma = new PrismaClient();

async function getSubmissions(req, res) {
  try {
    const { userId } = req.body;
    const problemId = parseInt(req.params.problemId);

    // Checking if the userID and problemID is provided or not
    if (!userId || !problemId) {
      return res.status(400).json({
        message: "Err: provide the userID and problemID",
        body: req.body,
      });
    }

    const usersProblemSubmissions = await prisma.submissions.findMany({
      where: {
        usersId: userId,
        problemsId: problemId,
      },
    });

    return res.status(200).json({
      message:
        "Successfully retrivied the users submissions for the current problem",
      solutions: usersProblemSubmissions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Err: Something went wrong when retreving the submissions",
    });
  }
}

async function postSubmission(req, res) {
  try {
    // console.log(req.body)
    const { userId, answer, language } = req.body;
    const problemId = parseInt(req.params.problemId);

    if (!answer) {
      return res.status(400).json({ message: "an answer is required!" });
    }

    const problem = await prisma.problems.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!problem) {
      return res.status(404).json({
        message: "Err: problem not found",
      });
    }

    //TODO: send code to a DOCKER CONTAINER and execute it there and then get the answer back depending on that set the isCorrect variable
    const result = await runCode(
      answer,
      language,
      problem.title.toLowerCase().replace(" ", ""),
      JSON.stringify(problem.testCases),
    );
    console.log(result);

    // let submission = await prisma.submissions.create({
    //   data: {
    //     answer: answer,
    //     SubmissionStat: isCorrect ? "CORRECT" : "INCORRECT",
    //     usersId: userId,
    //     problemsId: problemId,
    //   },
    // });
    if (!result?.result && result.consoleLogs) {
      return res.status(403).json({
        message: "some error occured during run time, check the console",
        result: result.result,
        consoleLogs: result.consoleLogs,
      });
    }

    return res.status(201).json({
      message: "Code ran Successfully on the backend!!! WOOOOOOOOoo",
      result: result.result,
      consoleLogs: result.consoleLogs,
      // submission: submission,
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({
      message:
        "Server Error: Something went wrong when trying to submit your submission",
    });
  }
}

module.exports = { getSubmissions, postSubmission };
