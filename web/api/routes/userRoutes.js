const express = require("express");
const userRouter = express.Router();
const { signup, login } = require("../controllers/userControllers.js");

userRouter.get("/", (req, res) => {
  res.status(200).send("<h1> This is root page of /user </h1>");
});

userRouter.post("/signup", signup);
userRouter.post("/login", login);

module.exports = userRouter;
