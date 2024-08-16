const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  await prisma.submissions.update({
    where: {
      id: data.submissionId,
    },
    data: {
      SubmissionStat: isCorrect ? "CORRECT" : "INCORRECT",
    },
  });
}

module.exports = { updateExecutionState };
