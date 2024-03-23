const { PrismaClient } = require("@prisma/client");
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
    const { userId, answer } = req.body;
    const problemId = parseInt(req.params.problemId);

    if (!answer) {
      return res.status(400).json({ message: "answer field is required" });
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

    //TODO
    let isCorrect = Math.random() < 0.5 ? "CA" : "WA";

    let submission = await prisma.submissions.create({
      data: {
        answer: answer,
        SubmissionStat: isCorrect ? "CORRECT" : "INCORRECT",
        usersId: userId,
        problemsId: problemId,
      },
    });

    return res.status(201).json({
      message: "Successfully submitted your answer",
      submission: submission,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message:
        "Err: Something went wrong when trying to submit your submission",
    });
  }
}

module.exports = { getSubmissions, postSubmission };
