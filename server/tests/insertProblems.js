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
            output: [0, 1],
          },
          1: {
            nums: [3, 2, 4],
            target: 6,
            output: [1, 2],
          },
          2: {
            nums: [3, 3],
            target: 6,
            output: [0, 1],
          },
        },

        StarterCode: {
          javascript:
            "//Write your code here\n" +
            "function solution(nums, target) {\n" +
            "  \n" +
            "}",
          cpp:
            "std::vector<int> solution(std::vector<int> nums) {" +
            "\n//write your code here" +
            "\n}",
        },

        problemEvalCode: {
          javascript:
            "function EvalUserCode(testcases) {\n" +
            "  let result = {};\n" +
            "  Object.keys(testcases).map((key) => {\n" +
            "    result[key] = solution(testcases[key].nums, testcases[key].target);\n" +
            "  })\n" +
            "return result;\n" +
            "}\n",
          cpp: "",
        },
        langSupport: ["javascript", "cpp"],
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
