const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUser(req, res) {
  const { userId } = req.body;
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      Role: true,
    },
  });

  return res.status(200).json({ user: user });
}

async function signup(req, res) {
  try {
    // get the user email and password from the body
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Err: All fields are required" });
    }

    // check if user already exists by matching it's email in the db
    const User = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (User) {
      return res.status(400).json({
        message: `Err: A User with the email ${email} is already registered`,
      });
    }

    // CREATING THE USER IN THE DB
    // if user doesn't exits then hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // save the username, email and hashedPassword in the db
    const newUser = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    // generate token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email },
      process.env.SECRET_KEY,
    );

    res.status(201).json({
      message: `Successfully registered new user ${newUser.username} with email ${newUser.email}`,
      user: {
        userID: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token: token, // This token is to be saved in browser's local storage for future API calls (IMPLEMENT ON THE FRONT-END SIDE)
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Some error occured during signup" });
  }
}

async function login(req, res) {
  try {
    // get the user's email and password from the body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Err: All fields are required" });
    }

    // check if the user exists in the database
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // If user doesn't exist in the database
    if (!existingUser) {
      return res.status(404).json({ message: "Err: User not found!" });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!passwordMatched) {
      return res.status(400).json({ message: "Err: incorrect password!" });
    }

    // generate token
    const token = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      },
      process.env.SECRET_KEY,
    );

    res.status(200).json({
      message: "Successfully logged in!",
      user: {
        userID: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      },
      token: token, // This token is to be saved in browser's local storage for future API calls (IMPLEMENT ON THE FRONT-END SIDE)
    });
  } catch (err) {
    res.status(500).send("Some error occured during login");
    console.log(err);
  }
}

module.exports = { getUser, signup, login };
