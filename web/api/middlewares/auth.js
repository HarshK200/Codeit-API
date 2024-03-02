const jwt = require("jsonwebtoken");

function auth(req, res, next) {
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

    // adding userId from the decoded token to req object
    req.userId = user.id;
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
