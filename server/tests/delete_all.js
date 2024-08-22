const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function clearTables() {
  try {
    // Delete comments associated with posts
    await prisma.submissions.deleteMany({});

    // Delete posts
    await prisma.problems.deleteMany({});

    console.log("Tables cleared successfully!");
  } catch (error) {
    console.error("Error clearing tables:", error);
  }
}

clearTables();
