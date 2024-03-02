const express = require("express");
const { getSubmission } = require("../controllers/submissionController");
const submissionsRouter = express.Router();

submissionsRouter.get("/", getSubmission);

module.exports = submissionsRouter;
