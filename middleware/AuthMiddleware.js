const jwt = require("jsonwebtoken");
const requireAuth = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (typeof headers !== "undefined") {
    const bearer = headers.split(" ");
    const token = bearer[1];

    if (token !== null || token !== undefined) {
      jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) {
          res.status(400).json({ message: "session Expired try re-login" });
        } else {
          next();
        }
      });
    }
  } else {
    console.log("hellp");
    res
      .status(400)
      .json({ message: "Token missing or session expired try login" });
  }
};

module.exports = requireAuth;
