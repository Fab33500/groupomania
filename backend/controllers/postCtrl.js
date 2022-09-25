const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

// -----------------------------------------

// ---------------- creation d'un post -------------OK---------------//
exports.createPost = async (req, res) => {
  const newPost = new postModel({
    ...req.body,
  });
  console.log("<<<<<<newpost", newPost);
  console.log("----------------isoner--------", req.userToken.id);

  if (newPost.posterId === req.userToken.id) {
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
        console.log("erreur de modification : " + err.value);
        res.send("erreur de modification : " + err.value);
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
      res.send("Erreur de suppression : " + err);
    }
  });
};

// ---------------- like d'un post ----------------------------//
exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.body.id)) {
    res.status(400).send("Id : " + req.body.id + " est inconnu!");
  } else {
    try {
      await postModel.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likers: req.body.id },
        },
        { new: true }
      );

      // .catch((err) => res.status(500).send({ message: err }));

      await userModel
        .findByIdAndUpdate(
          req.body.id,
          {
            $addToSet: { likes: req.params.id },
          },
          { new: true }
        )
        .then((data) => res.send({ data, msg: "ok" }))
        .catch((err) => res.status(401).json(err));
    } catch (err) {
      res.status(400).json({ msg: "Id du post inccorect" });
    }
  }
};

// ---------------- Unlike d'un post ----------------------------//
exports.unLikePost = async (req, res) => {
  if (!ObjectID.isValid(req.body.id)) {
    res.status(400).send("Id : " + req.body.id + " est inconnu!");
  } else {
    try {
      await postModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likers: req.body.id },
        },
        { new: true }
      );

      await userModel
        .findByIdAndUpdate(
          req.body.id,
          {
            $pull: { likes: req.params.id },
          },
          { new: true }
        )
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
      res.status(400).json({ msg: "Id du post inccorect" });
    }
  }
};
