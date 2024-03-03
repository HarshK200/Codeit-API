const express = require("express");
const userRouter = express.Router();
const { getUser } = require("../controllers/userControllers.js");

userRouter.get("/", getUser);

module.exports = userRouter;
