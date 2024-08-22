const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// WEBHOOK
// IMPORTANT! only accessed by the worker node
async function updateExecutionState(req, res) {
  /*
  data Object = {
      result: Object,
      stdout: stdout,
      stderr: stderr,
      stdErrType: "Runtime_Error",
      submissionId: data.submissionId,
  }
*/

  const data = req.body;
  const result = JSON.parse(data.result);
  let isCorrect = true;
  Object.keys(result).map((key) => {
    if (!result[key].passed) {
      isCorrect = false;
      return;
    }
  });

  if (data.stderr !== "") {
    await prisma.submissions.update({
      where: {
        id: data.submissionId,
      },
      data: {
        ExecutionStat: data.stdErrType,
        testCasesResult: data.result,
        stdout: data.stdout,
        stderr: data.stderr,
      },
    });
    return;
  }
  await prisma.submissions.update({
    where: {
      id: data.submissionId,
    },
    data: {
      ExecutionStat: isCorrect ? "Accepted" : "Wrong Answer",
      testCasesResult: data.result,
      stdout: data.stdout,
      stderr: data.stderr,
    },
  });
}

async function getSubmissionState(req, res) {
  // console.log(req.body);
  const submissionId = req.body.submissionId;
  const submission = await prisma.submissions.findUnique({
    where: {
      id: submissionId,
    },
  });
  res.status(200).send(submission);
  // console.log(submission);
}

module.exports = { updateExecutionState, getSubmissionState };
