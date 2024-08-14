const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.submissions.create({
    data: {
      problemsId: 1,
      usersId: "2b9fce45-9eb1-496e-8f33-e682057b1bf4",
      answer: "This is the answer for problem 1",
      SubmissionStat: "CORRECT",
    },
  });
}

try {
  main();
} catch (err) {
  console.log(err);
}
