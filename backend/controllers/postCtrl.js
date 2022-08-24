const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const isOwner = require("../middlewares/isOwner");

// -----------------------------------------

// ---------------- creation d'un post -------------OK---------------//
exports.createPost = async (req, res) => {
  const newPost = new postModel({
    ...req.body,
    // posterId: req.body.posterId,
    // message: req.body.message,
    // likers: [],
    // comments: [],
  });
  console.log("<<<<<<newpost", newPost);
  //   console.log("<<<<<<message", newPost.message);
  if (newPost.posterId === req.auth.userId) {
    try {
      const post = await newPost.save();
      res.status(201).json({
        success: `Votre post : ${post._id} a été correctement créé et enregistré , `,
        post,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    return res.status(400).json({
      msg: "Vous ne pouvez pas creer ce post ",
    });
  }
};

// ---------------- lire tous les posts ----------------------------//
exports.readPost = async (req, res) => {
  postModel.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Erreur pour obtenir des données: " * err);
    }
  });
};

// ---------------- modification d'un post ----------------------------//

exports.updatePost = async (req, res) => {
  // verification si user existe
  // const verifUser = await userModel.findById({ _id: req.params.id });
  // console.log("<<<<<<<<  verifUser", verifUser);

  // if (verifUser) {
  //   // return res.status(400).json("id unknow : " + req.params.id);
  // }

  const uploadPost = {
    message: req.body.message,
  };
  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: uploadPost },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log("update error : " + err);
      }
    }
  );
};

// ---------------- suppression d'un post ----------------------------//
exports.deletePost = async (req, res) => {
  postModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("delete error : " + err);
    }
  });
};
