const express = require("express");
const mongoose = require("mongoose");

const morgan = require("morgan");

require("./config/db");

// import routes
const userRoutes = require("./routes/userRoutes");

const app = express();

// logs
app.use(morgan("dev"));

// debug mongoose
console.log("-----------------debug mongoose-----------");
mongoose.set("debug", true);

// analyse les requêtes
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// route user
app.use("/api/user", userRoutes);

module.exports = app;
