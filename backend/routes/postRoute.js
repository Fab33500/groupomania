const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/postCtrl");

// const authorization = require("../middlewares/auth");
const { isPostOwner } = require("../middlewares/isOwner");
const { checkUser } = require("../middlewares/auth");

// post
router.get("/", postCtrl.readPost);
router.post("/", checkUser, postCtrl.createPost);
router.put("/:id", checkUser, isPostOwner, postCtrl.updatePost);
router.delete("/:id", checkUser, isPostOwner, postCtrl.deletePost);
router.patch("/like-post/:id", checkUser, postCtrl.likePost);
router.patch("/unlike-post/:id", checkUser, postCtrl.unLikePost);

module.exports = router;
