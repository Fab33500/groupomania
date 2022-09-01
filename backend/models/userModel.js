const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
      minlength: 3,
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
      minlength: 3,
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
      minlength: 3,
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

// Appliquer le plugin uniqueValidator à userSchema
userSchema.plugin(uniqueValidator);

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

// comparer le password avec la bdd
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Mot de passe incorrect");
  }
  throw Error(" Email incorrect");
};

module.exports = mongoose.model("user", userSchema);
