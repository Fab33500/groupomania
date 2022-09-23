const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multerConfig");

const updateImgCtrl = require("../controllers/updateImgCtrl");

const { checkUser } = require("../middlewares/auth");
const { isOwner } = require("../middlewares/isOwner");

// post

router.put(
  "/upload_avatar/:id",
  checkUser,
  isOwner,
  multer,
  updateImgCtrl.updateProfil
);

module.exports = router;
