const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

async function main() {
  const problems = await prisma.problems.findMany();
  console.log("problems: ", problems);
  const users = await prisma.users.findMany();
  console.log("users: ", users);
  const submission = await prisma.submissions.findMany();
  console.log("submissions: ", submission);
}

main()
  .catch((err) => {
    console.log(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
