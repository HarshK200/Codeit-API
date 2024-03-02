const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.submissions.create({
    data: {
      problemsId: 1,
      usersId: "90a8ebfb-40d9-4e66-9279-ad1affed0205",
      answer: "This is the answer for problem 1",
    },
  });
}

try {
  main();
} catch (err) {
  console.log(err);
}
