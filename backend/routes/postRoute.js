const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/postCtrl");
const commentCtrl = require("../controllers/commentCtrl");

// const authorization = require("../middlewares/auth");
const {
  isPostOwner,
  isAdminPost,
  isCommentOwner,
} = require("../middlewares/isOwner");
const { checkUser } = require("../middlewares/auth");

// post
router.get("/", checkUser, postCtrl.readPost);
router.post("/", checkUser, postCtrl.createPost);
router.put("/:id", checkUser, isAdminPost, postCtrl.updatePost);
router.delete("/:id", checkUser, isAdminPost, postCtrl.deletePost);

router.patch("/like-post/:id", checkUser, postCtrl.likePost);
router.patch("/unlike-post/:id", checkUser, postCtrl.unLikePost);

router.patch("/comment/:id", checkUser, commentCtrl.commentPost);
router.patch(
  "/edit-comment/:id",
  checkUser,
  isCommentOwner,
  commentCtrl.editCommentPost
);
router.patch(
  "/delete-comment/:id",
  checkUser,
  isCommentOwner,
  commentCtrl.deleteCommentPost
);

module.exports = router;
