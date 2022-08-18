const jwt = require("jsonwebtoken");
require("dotenv").config();

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
    res.status(401).json({ msg: "token d'authentification invalide" });
  }
};
