const express = require("express");
const mongoose = require("mongoose");

const morgan = require("morgan");

require("./config/db");

const app = express();

// logs
app.use(morgan("dev"));

// debug mongoose
console.log("-----------------debug mongoose-----------");
mongoose.set("debug", true);

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
