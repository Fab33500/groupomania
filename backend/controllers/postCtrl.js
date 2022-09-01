const postModel = require("../models/postModel");

// -----------------------------------------

// ---------------- creation d'un post -------------OK---------------//
exports.createPost = async (req, res) => {
  const newPost = new postModel({
    ...req.body,
  });
  console.log("<<<<<<newpost", newPost);

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
        console.log("update error : " + err.value);
      }
    }
  );
};

// ---------------- suppression d'un post ----------------------------//
exports.deletePost = async (req, res) => {
  postModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(`Le post : ${req.params.id} a été supprimé avec succes`);
    } else {
      console.log("Erreur de suppression : " + err);
    }
  });
};
