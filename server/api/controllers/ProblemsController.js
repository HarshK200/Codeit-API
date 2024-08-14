const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getProblemsList(req, res) {
  try {
    const problems = await prisma.problems.findMany({
      select: {
        id: true,
        title: true,
        difficulty: true,
        AcceptanceRate: true,
      },
    });
    res.status(200).json({
      message: "Successfully retrivied all problems data form the database",
      problems: problems,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Err: something went wrong during getting the problems",
    });
  }
}

async function getFullProblem(req, res) {
  try {
    const problemId = parseInt(req.params.problemId);

    const fullProblem = await prisma.problems.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!fullProblem) {
      return res.status(404).json({
        status:404,
        message: "Err: Problem not found in the DB",
      });
    }

    res.status(200).json({
      message: "Successfully retrivied the problem from the database",
      problem: fullProblem,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Err: something went wrong during getting the problems",
    });
  }
}

module.exports = { getProblemsList, getFullProblem };
