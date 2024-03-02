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
    const id = parseInt(req.params.id);

    const fullProblem = await prisma.problems.findUnique({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Successfully retrivied the problem form the database",
      problem: fullProblem,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Err: something went wrong during getting the problems",
    });
  }
}

module.exports = { getProblemsList, getFullProblem };
