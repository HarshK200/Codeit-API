const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("node:fs").promises;

async function main() {
  // const problems = await prisma.problems.findMany();
  // console.log("problems: ", problems);
  // const users = await prisma.users.findMany();
  // console.log("users: ", users);
  // const submission = await prisma.submissions.findMany();
  // console.log("submissions: ", submission);
  const submissions = await prisma.submissions.findMany({});
  fs.writeFile("submissions.json", JSON.stringify(submissions));
}

main()
  .catch((err) => {
    console.log(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
