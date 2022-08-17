const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_PASSWORD = process.env.JWT_PASSWORD;

// const user = userModel.login(emailCryptoJs, password);
const maxAge = 24 * 60 * 60 * 1000; // expire dans 24h

module.exports = {
  generateTokenForUser: (user) => {
    return jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN,
      {
        expiresIn: maxAge,
      }
    );
  },
};
