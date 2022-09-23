const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/postCtrl");

// const authorization = require("../middlewares/auth");
const { isPostOwner } = require("../middlewares/isOwner");

// post
router.get("/", postCtrl.readPost);
router.post("/", postCtrl.createPost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);
router.patch("/like-post/:id", postCtrl.likePost);
router.patch("/unlike-post/:id", postCtrl.unLikePost);

module.exports = router;
