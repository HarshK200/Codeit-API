const fsPromise = require("node:fs/promises");
const express = require("express");
const questionsRouter = express.Router();
const questions = require("../db/Questions.json");

questionsRouter.get("/", (req, res) => {
  const filePath = require.resolve("../db/Questions.json");
  fsPromise
    .readFile(filePath, "utf8", (err, jsonString) => {
      questions = JSON.parse(jsonString);
    })
    .then(() => {
      res
        .status(200)
        .send(
          `Here's your question\n <h1>${questions.title}</h1> <h2>${questions.description}</h2> <h3> TestCases: </h3> input:${questions.testCases[0].input}\n output:${questions.testCases[0].output}`,
        );
    })
    .catch((err) => {
      console.log("There was an error:\n", err);
    });
});

module.exports = questionsRouter;
