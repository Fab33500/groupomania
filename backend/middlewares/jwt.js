const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_TOKEN = process.env.JWT_TOKEN;

const generateTokenForUser = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, JWT_TOKEN);
};

module.exports = generateTokenForUser;
