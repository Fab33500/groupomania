const jwt = require("jsonwebtoken");
require("dotenv").config();

const { authErrors } = require("../utils/errors");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    console.log(decodedToken.userId);

    const userId = decodedToken.userId;
    req.auth = { userId };
    console.log("<--------req.auth", req.auth);

    if (req.params.id && decodedToken.userId !== userId) {
      throw err;
    } else {
      next();
    }
  } catch (err) {
    const errors = authErrors(err);
    res.status(401).json(errors);
  }
};
