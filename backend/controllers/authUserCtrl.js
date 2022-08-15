const userModel = require("../models/userModel");
const { signUpErrors } = require("../utils/errors");

// -----------------------------------------

// inscription user
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
    res.status(200).send(errors);
  }
};
