const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/postCtrl");

const authorization = require("../middlewares/auth");
const { isPostOwner } = require("../middlewares/isOwner");

// post
router.get("/", authorization, postCtrl.readPost);
router.post("/", authorization, postCtrl.createPost);
router.put("/:id", authorization, isPostOwner, postCtrl.updatePost);
router.delete("/:id", authorization, isPostOwner, postCtrl.deletePost);
router.patch("/like-post/:id", postCtrl.likePost);
router.patch("/unlike-post/:id", postCtrl.unLikePost);

module.exports = router;
