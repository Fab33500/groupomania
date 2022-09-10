const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const morgan = require("morgan");

require("./config/db");

// import routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoute");
const uploadRoutes = require("./routes/uploadRoute");

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

// gestion errurs de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// route user
app.use("/api/user", userRoutes);
// route posts
app.use("/api/post", postRoutes);

// route upload
app.use(
  "/public/uploads/userAvatar",
  express.static(path.join(__dirname, "public/uploads/userAvatar"))
);
app.use("/api/user", uploadRoutes);

module.exports = app;
