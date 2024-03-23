const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    let token = req.headers.authorization_token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "No authorization_token provided" });
    }
    token = token.split(" ")[1];

    // Verifying the token and decoding it to get the userinfo
    let user = jwt.verify(token, process.env.SECRET_KEY);

    // Checking if the user exists in the database
    const isUser = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!isUser) {
      return res
        .status(404)
        .json({ message: "No user exists with provided id" });
    }

    // adding userId from the decoded token to req object
    req.body.userId = user.id;
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Some err occured during authorization" });
  }

  // Calling the next handler after this
  next();
}

module.exports = auth;
