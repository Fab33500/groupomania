const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cookieParser = require("cookie-parser");

const morgan = require("morgan");

require("./config/db");

// import routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoute");
const uploadRoutes = require("./routes/uploadRoute");

const app = express();
const { checkUser, requireAuth } = require("./middlewares/auth");

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
app.use(cookieParser());

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

// jwt
// app.use("*", checkUser);
// app.post("*", checkUser);
// app.put("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
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
app.use(
  "/public/uploads/default",
  express.static(path.join(__dirname, "public/uploads/default"))
);
app.use("/api/user", uploadRoutes);

module.exports = app;
