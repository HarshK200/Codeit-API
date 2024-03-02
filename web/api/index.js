const express = require("express");
const userRouter = require("./routes/userRoutes");
const submissionsRouter = require("./routes/submissions");
const problemsRouter = require("./routes/problems");
const auth = require("./middlewares/auth");
const app = express();

// Parsing all the req objects
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/problems", problemsRouter);

// auth Middleware needed for this route
app.use("/submissions", auth, submissionsRouter);

// route to create a new problem

app.get("/", (req, res) => {
  res.status(200).send("<h1>Root Page</h1>");
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});
