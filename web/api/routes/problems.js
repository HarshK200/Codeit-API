const express = require("express");
const problemsRouter = express.Router();
const {
  getProblemsList,
  getFullProblem,
} = require("../controllers/ProblemsController.js");

problemsRouter.get("/", getProblemsList);

problemsRouter.get("/:id", getFullProblem);

module.exports = problemsRouter;
