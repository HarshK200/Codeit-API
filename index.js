const express = require("express");
const userRouter = require("./routes/userRoutes");
const questionsRouter = require("./routes/questions");
const app = express();

// Routes
app.use("/user", userRouter);
app.use("/questions", questionsRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Root Page</h1>");
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});
