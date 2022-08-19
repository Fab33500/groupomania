const userModel = require("../models/userModel");
const { signUpErrors, loginErrors } = require("../utils/errors");
const jwtToken = require("../middlewares/jwt");

// chiffre email
const cryptoJs = require("crypto-js");

// -----------------------------------------

// ---------------- inscription user ----------------------------//
exports.signup = async (req, res) => {
  const { pseudo, email, password } = req.body;
  console.log("<<<<<<<<<<< --> ,", req.body);

  try {
    const user = await userModel.create({ pseudo, email, password });

    res.status(201).json({
      msg: ` Le compte ${user.pseudo}, a été créé avec succès, ID :${user._id}`,
    });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).json(errors);
  }
};

// ---------------- connexion user ----------------------------//
exports.login = async (req, res) => {
  const { password } = req.body;

  // crypter l'email pour comparaison avec email de la bdd
  const emailCryptoJs = cryptoJs
    .HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL)
    .toString();

  console.log("------------>pass", emailCryptoJs);

  try {
    const user = await userModel.login(emailCryptoJs, password);
    console.log("------------>pass2", emailCryptoJs, user.email);

    res.status(200).json({
      userId: user._id,
      pseudo: user.pseudo,
      token: jwtToken.generateTokenForUser(user),
    });
  } catch (err) {
    const errors = loginErrors(err);
    res.status(400).json(errors);
  }
};

// ---------------- deconnexion user ----------------------------//
exports.logout = async (req, res) => {};
