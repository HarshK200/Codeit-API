const express = require("express");
const problemsRouter = express.Router();
const { getProblems } = require("../controllers/ProblemsController.js");

problemsRouter.get("/", getProblems);

module.exports = problemsRouter;
