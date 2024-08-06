const express = require("express");
const problemsetRouter = express.Router();
const {
  getProblemsList,
  getFullProblem,
} = require("../controllers/ProblemsController.js");
const {
  getSubmissions,
  postSubmission,
} = require("../controllers/submissionController.js");
const auth = require("../middlewares/auth.js");

problemsetRouter.get("/", getProblemsList);
problemsetRouter.get("/:problemId", getFullProblem);

problemsetRouter.get("/:problemId/submissions", auth, getSubmissions);
problemsetRouter.post("/:problemId/submit", auth, postSubmission);

module.exports = problemsetRouter;
