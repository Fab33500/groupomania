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

module.exports = router;
