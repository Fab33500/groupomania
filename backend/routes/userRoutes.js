// importations
const express = require("express");

const authUserCtrl = require("../controllers/authUserCtrl.js");
const password = require("../middlewares/passwordValidator");

const router = express.Router();

// Auth user
router.post("/signup", password, authUserCtrl.signup);
router.post("/login", password, authUserCtrl.login);
router.get("/logout", authUserCtrl.logout);

module.exports = router;
