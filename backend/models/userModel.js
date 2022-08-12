const mongoose = require("mongoose");

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
      maxlength: 30,
    },
    bio: {
      type: String,
      max: 1024,
    },
    isAdmin: {
      type: boolean,
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
