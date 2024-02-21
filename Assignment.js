const fsPromise = require("node:fs/promises");

import express from "express";
const app = express();
const port = 6969;

app.get("/", (req, res) => {
  res.send("ROOT Route");
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("email or password is required");
  }

  const isExistingUser = Users.find((user) => {
    if (user.email === email) {
      return true;
    }
  });

  if (isExistingUser) {
    return res.status(409).send("user is already registered try logging in");
  }

  // Storing the user in the Users array
  Users.push({ email, password });

  // Return 200 status code if we successfully registered a new user
  res.status(200).send("User successfully signed up");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const isExistingUser = Users.find((user) => {
    if (user.email === email) {
      return true;
    }
  });

  if (!isExistingUser) {
    return res
      .status(400)
      .send(`Err: the email ${email} is not registered please to sign up`);
  }

  res.status(200).send("successfully logged in!");
});

app.use((req, res, next) => {
  const { email } = req.body;
});

app.get("/question", (req, res) => {
  const { title, description } = Questions[0];

  res.send(`
    <div>
        <h1>${title}</h1>
        <p>${description}</p>
    </div>`);
});

app.get("/submissions", (req, res) => {});

async function readUsers() {
  try {
    const Users = await fsPromise.readFile(
      require.resolve("../db/Users.json"),
      { encoding: "utf8" },
    );
    return Users;
  } catch (err) {
    console.log(err);
  }
}

async function readQuestions() {
  try {
    const Questions = await fsPromise.readFile(
      require.resolve("../db/Questions.json"),
      { encoding: "utf8" },
    );
    return Questions;
  } catch (err) {
    console.log(err);
  }
}

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
