// importations
const express = require("express");
const password = require("../middlewares/passwordValidator");

const authUserCtrl = require("../controllers/authUserCtrl.js");
const userCtrl = require("../controllers/userCtrl");

const router = express.Router();

// AuthUser
router.post("/signup", password, authUserCtrl.signup);
router.post("/login", password, authUserCtrl.login);
router.get("/logout", authUserCtrl.logout);

// user
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
