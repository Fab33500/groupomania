// importations
const express = require("express");
const password = require("../middlewares/passwordValidator");

const authUserCtrl = require("../controllers/authUserCtrl.js");
const userCtrl = require("../controllers/userCtrl");

const authorization = require("../middlewares/auth");
const { isOwner } = require("../middlewares/isOwner");

const router = express.Router();

// AuthUser
router.post("/signup", password, authUserCtrl.signup);
router.post("/login", password, authUserCtrl.login);
router.get("/logout", authUserCtrl.logout);

// user
router.get("/", authorization, userCtrl.getAllUsers);
router.get("/:id", authorization, isOwner, userCtrl.getOneUser);
router.put("/:id", authorization, isOwner, userCtrl.updateUser);
router.delete("/:id", authorization, isOwner, userCtrl.deleteUser);

module.exports = router;
