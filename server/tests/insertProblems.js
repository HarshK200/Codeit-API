const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.problems.createMany({
    data: [
      {
        AcceptanceRate: 52.0,
        difficulty: "EASY",
        title: "Two Sum",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.",
        examples: {
          0: {
            input: [2, 7, 11, 15],
            target: 9,
            output: [0, 1],
          },
          1: {
            input: [3, 2, 4],
            target: 6,
            output: [1, 2],
          },
          2: {
            input: [3, 3],
            target: 6,
            output: [0, 1],
          },
        },
        testCases: {
          0: {
            nums: [2, 7, 11, 15],
            target: 9,
          },
          1: {
            nums: [3, 2, 4],
            target: 6,
          },
          2: {
            nums: [3, 3],
            target: 6,
          },
        },
        StarterCode:
          "//Write your code here\n" +
          "function solution(nums) {\n" +
          "\t\n" +
          "}\n\n",
      },
      {
        AcceptanceRate: 61.6,
        difficulty: "EASY",
        title: "Move Zeroes",
        description:
          "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.\nNote that you must do this in-place without making a copy of the array.",
        examples: {
          0: {
            input: [0, 1, 0, 3, 12],
            output: [1, 3, 12, 0, 0],
          },
          1: {
            input: [0],
            output: [0],
          },
        },
        testCases: {
          0: {
            input: [0, 1, 0, 3, 12],
          },
          1: {
            input: [0],
          },
        },
        StarterCode:
          "//Write your code here\n" +
          "function solution(nums) {\n" +
          "\t\n" +
          "}\n\n",
      },
    ],
  });
  console.log(result);
}

try {
  main();
} catch (err) {
  console.log(err);
}
