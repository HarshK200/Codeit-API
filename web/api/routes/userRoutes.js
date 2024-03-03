const express = require("express");
const userRouter = express.Router();
const { signup, login, getUser } = require("../controllers/userControllers.js");
const auth = require("../middlewares/auth.js");

userRouter.get("/", auth, getUser);

userRouter.post("/signup", signup);
userRouter.post("/login", login);

module.exports = userRouter;
