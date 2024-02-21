const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.status(200).send("<h1> This is root page of /user </h1>");
});

userRouter.post("/signup", (req, res) => {
  res.status(200).send("You sent a post request on singup page");
});

userRouter.post("/login", (req, res) => {
  res.status(200).send("You sent a post request on login page");
});

module.exports = userRouter;
