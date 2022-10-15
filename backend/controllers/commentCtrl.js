const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

// -----------------------------------------

// ---------------- creer un commentaire ----------------------------//
exports.commentPost = async (req, res) => {
  // verifie si c'est la personne connectée qui commente le post
  if (req.userToken.id !== req.body.commenterId) {
    res.status(400).send("Vous ne pouvez pas commenter ce post");
  } else {
    try {
      postModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
              commenterId: req.body.commenterId,
              commenterPseudo: req.body.commenterPseudo,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (!err) {
            res.send(docs);
          } else {
            res.status(400).send({ msg: "post inconnu", err });
          }
        }
      );
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

// ---------------- modifier un commentaire ----------------------------//
exports.editCommentPost = async (req, res) => {
  try {
    // verifie que l'objectId est valide

    await postModel
      .findById(req.params.id, (err, docs) => {
        const commentUdate = docs.comments.find((comment) => {
          return comment._id.equals(req.body.commentId);
        });

        commentUdate.text = req.body.text;
        res.status(200).send(commentUdate);
        return docs.save();
      })
      .clone()
      .catch((err) => {
        res.status(200).send(err);
        console.log(err);
      });
  } catch (err) {
    res.status(400).send(err);
  }
};

// ---------------- supprimer un commentaire ----------------------------//
exports.deleteCommentPost = async (req, res) => {
  try {
    return postModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (!err) {
            return res.status(200).send("Commentaire supprimé");
          } else {
            return res.status(400).send(err);
          }
        }
      )
      .clone();
  } catch (err) {
    return res.status(400).send(err);
  }
};
