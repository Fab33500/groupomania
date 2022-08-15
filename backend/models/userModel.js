const mongoose = require("mongoose");

//  variables d'environnement
require("dotenv").config();

//chiffre email
const cryptoJs = require("crypto-js");

// cryptage du mot de passe
const bcrypt = require("bcrypt");

// verification de la validité de l'email
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      minLength: 3,
      maxlength: 20,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      minLength: 3,
      maxlength: 30,
    },
    lastname: {
      type: String,
      minLength: 3,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    job: {
      type: String,
      minLength: 3,
      maxlength: 8,
    },
    bio: {
      type: String,
      max: 1024,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// crypter le mdp avant l'enregistrement dans la bdd
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// crypter l'email avant l'enregistrement dans la bdd
userSchema.pre("save", async function (next) {
  this.email = await cryptoJs
    .HmacSHA256(this.email, process.env.CRYPTOJS_EMAIL)
    .toString();
});

module.exports = mongoose.model("user", userSchema);
