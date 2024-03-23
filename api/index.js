const express = require("express");
const userRouter = require("./routes/userRoutes");
const auth = require("./middlewares/auth");
const { login, signup } = require("./controllers/userControllers");
const problemsetRouter = require("./routes/problemset");
const app = express();

// Parsing all the req objects
app.use(express.json());

// Routes
app.use("/signup", signup);
app.use("/login", login);
app.use("/problemset", problemsetRouter);

// auth Middleware needed for these route
app.use("/user", auth, userRouter);

// TODO make route to create a new problem

app.get("/", (req, res) => {
  res.status(200).send("<h1>Root Page</h1>");
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});
