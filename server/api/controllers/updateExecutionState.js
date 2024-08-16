const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// IMPORTANT! only accessed by the worker node
async function updateExecutionState(req, res) {
  const data = req.body;
  const result = data.result;
  // console.log(data);
  // console.log("STDOUT: ", data.stdout);
  // console.log(JSON.parse(data.result));
  let isCorrect = true;
  Object.keys(result).map((key) => {
    if (!result[key].passed) {
      isCorrect = false;
      return;
    }
  });
  console.log(data);
  // TODO: change this to upsert
  await prisma.submissions.update({
    where: {
      id: data.submissionId,
    },
    data: {
      SubmissionStat: isCorrect ? "CORRECT" : "INCORRECT",
      testCasesResult: data.result,
    },
  });
  console.log("sucessfully updated submission state");
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
