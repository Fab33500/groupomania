const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multerConfig");

const updateImgCtrl = require("../controllers/updateImgCtrl");

const { checkUser } = require("../middlewares/auth");
const { isOwner, isPostOwner } = require("../middlewares/isOwner");

// upload avatar

router.put(
  "/upload_avatar/:id",
  checkUser,
  isOwner,
  multer,
  updateImgCtrl.updateProfil
);

// upload image post
router.put(
  "/upload_postImg/:id",
  checkUser,
  isPostOwner,
  multer,
  updateImgCtrl.updatePostImg
);

module.exports = router;
