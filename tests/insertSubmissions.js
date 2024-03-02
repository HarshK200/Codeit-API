const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.submissions.create({
    data: {
      problemsId: 1,
      usersId: "d21609f3-6ef6-4a1d-8d77-d845dc3bd0dc",
      answer: "This is the answer for problem 1",
    },
  });
}

try {
  main();
} catch (err) {
  console.log(err);
}
