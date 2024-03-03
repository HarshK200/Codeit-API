const express = require("express");
const {
  getSubmission,
  postSubmission,
} = require("../controllers/submissionController");
const submissionsRouter = express.Router();

submissionsRouter.get("/", (req, res) => {
  return res.status(200).json({
    message: "This is the root page of submissions",
  });
});

submissionsRouter.get("/:problemId", getSubmission);

submissionsRouter.post("/submissions/:problemId", postSubmission);

module.exports = submissionsRouter;
