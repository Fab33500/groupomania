// importations
const express = require("express");
const password = require("../middlewares/passwordValidator");

const authUserCtrl = require("../controllers/authUserCtrl.js");
const userCtrl = require("../controllers/userCtrl");

// const authorization = require("../middlewares/auth");
const { isOwner, isAdmin } = require("../middlewares/isOwner");
const { checkUser } = require("../middlewares/auth");

const router = express.Router();

// AuthUser
router.post("/signup", password, authUserCtrl.signup);
router.post("/login", password, authUserCtrl.login);
router.get("/logout", checkUser, authUserCtrl.logout);

// user
router.get("/", checkUser, userCtrl.getAllUsers);
router.get("/:id", checkUser, userCtrl.getOneUser);
router.put("/:id", checkUser, isOwner, userCtrl.updateUser);
router.delete("/:id", checkUser, isAdmin, userCtrl.deleteUser);

module.exports = router;
