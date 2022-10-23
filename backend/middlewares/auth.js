const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/userModel");

// const { authErrors } = require("../utils/errors");

// verifier si l'user est connecté tout au long de sa visite

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        // suppression du cookie si il y a une erreur
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await userModel.findById(decodedToken.id);

        // res.locals.user = user;
        req.userToken = decodedToken;
        console.log("user middlware auth ---------------", user);
        next();
      }
    });
  } else {
    console.log("cookie null-----------------", token);
    res.status(400).json({ msg: "Vous n'etes pas connecté" });
  }
};

// verifier si l'user est connecté tout au long de sa visite
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(400).json("pas de token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("pas de token");
  }
};
