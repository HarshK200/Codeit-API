const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getSubmission(req, res) {
  try {
    const { userId, problemID } = req.body;
    // Checking if the userID and problemID is provided or not
    if (!userId || !problemID) {
      return res.status(400).json({
        message: "Err: provide the userID and problemID",
        body: req.body,
      });
    }

    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(400).json({
        message: "Err: The user with the provided id doesn't exists",
      });
    }

    const usersProblemSubmissions = await prisma.submissions.findMany({
      where: {
        usersId: userId,
        problemsId: problemID,
      },
    });

    return res.status(200).json({
      message: `Successfully retrivied the users submissions for the current problem`,
      solutions: usersProblemSubmissions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Err: Something went wrong when retreving the submissions",
    });
  }
}

module.exports = { getSubmission };
