const userModel = require("../models/userModel");
const { signUpErrors, loginErrors } = require("../utils/errors");
const generateTokenForUser = require("../middlewares/jwt");

// chiffre email
const cryptoJs = require("crypto-js");

// durée du cookie
const maxAge = 24 * 60 * 60 * 1000; // expire dans 24h

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
    res.status(400).json({ errors });
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

    res.cookie("jwt", generateTokenForUser(user._id, user.isAdmin), {
      httpOnly: true,
      maxAge,
    });

    res.status(200).json({
      msg: "Vous etes bien connecté, " + user.pseudo,
      userId: user._id,
      pseudo: user.pseudo,
      token: generateTokenForUser(user._id, user.isAdmin),
    });
  } catch (err) {
    const errors = loginErrors(err);
    res.status(400).json({ errors });
  }
};

// ---------------- deconnexion user ----------------------------//
exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login"); // redirection sur la page de connexion
};
