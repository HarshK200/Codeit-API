const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getProblems(req, res) {
  try {
    const problems = await prisma.problems.findMany({
      take: 5,
    });
    res.status(200).json({
      message: "Successfully retrivied first 5 problems form the database",
      problems: problems,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Err: something went wrong during getting the problems",
    });
  }
}

module.exports = { getProblems };
