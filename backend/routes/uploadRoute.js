const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multerConfig");

const updateImgCtrl = require("../controllers/updateImgCtrl");

const authorization = require("../middlewares/auth");
const { isOwner } = require("../middlewares/isOwner");

// post

router.put(
  "/upload_avatar/:id",
  authorization,
  isOwner,
  multer,
  updateImgCtrl.updateProfil
);

module.exports = router;
