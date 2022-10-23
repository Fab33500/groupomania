const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const ObjectID = require("mongoose").Types.ObjectId;

const { isOwnerErrors, isPostOwnerErrors } = require("../utils/errors");

exports.isOwner = async (req, res, next) => {
  // controle l'utilisateur qui fait la requete à user ID
  // si ce n'est pas le proprietaire:
  if (req.params.id === req.userToken.id) {
    next();
  }
  // si la requete est faite par le propriétaire
  else {
    const errors = isOwnerErrors();
    return res.status(401).json(errors);
  }
};

// admin
exports.isAdmin = async (req, res, next) => {
  // controle l'utilisateur qui fait la requete à user ID ou l'admin

  if (req.params.id === req.userToken.id || req.userToken.isAdmin === true) {
    next();
  }
  // si la requete est faite par le propriétaire
  else {
    const errors = isOwnerErrors();
    return res.status(401).json(errors);
  }
};

exports.isPostOwner = async (req, res, next) => {
  postModel
    .findOne({ _id: req.params.id })

    .then((newPost) => {
      // controle l'utilisateur qui fait la requete à posterId du post
      if (newPost.posterId === req.userToken.id) {
        if (!newPost.posterId) {
          return res.status(404).json({
            msg: "Post non trouvé",
          });
        } else {
          next();
        }
      }
      // si la suppression n'est pas faite par le propriétaire
      else {
        const errors = isPostOwnerErrors();
        return res.status(403).json(errors);
      }
    })
    .catch((error) =>
      res.status(500).send(`ID du post : ${req.params.id} n'existe pas`)
    );
};

// admin
exports.isAdminPost = async (req, res, next) => {
  postModel
    .findOne({ _id: req.params.id })

    .then((newPost) => {
      // controle l'utilisateur qui fait la requete à posterId du post ou l'admin
      if (
        newPost.posterId === req.userToken.id ||
        req.userToken.isAdmin === true
      ) {
        if (!newPost.posterId) {
          return res.status(404).json({
            msg: "Post non trouvé",
          });
        } else {
          next();
        }
      }
      // si la suppression n'est pas faite par le propriétaire
      else {
        const errors = isPostOwnerErrors();
        return res.status(403).json(errors);
      }
    })
    .catch((error) =>
      res.status(500).send(`ID du post : ${req.params.id} n'existe pas`)
    );
};

exports.isCommentOwner = async (req, res, next) => {
  // verifieje format de l'id
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .send("Commentaire n° : " + req.params.id + " n'existe pas");

  const token = req.cookies.jwt;
  console.log("cookie isCommentOwner<<<<<<<<<<<<<<<<", token);

  // recuperation de l'id dans le token
  jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
    let user = await userModel.findById(decodedToken.id);

    // res.locals.user = user;
    req.userToken = decodedToken;
    console.log("user middlware auth ---------------", user.id);

    const post = await postModel.findOne({ id: req.params.id });

    // verifie que l'id du  post soit correct
    if (post.id !== req.params.id) {
      res.status(400).send("Le commentaire n'existe pas");
    } else {
      // recherche du createur du commentaire du post
      await postModel
        .findById(req.params.id, (err, docs, commentId, commentUdate) => {
          commentUdate = docs.comments.find((comment) => {
            // recuperation de l'id dans _id:ObjectId
            commentId = comment._id.valueOf();

            return comment._id.equals(req.body.commentId);
          });

          // verification de la validité du req.body.commentId
          if (commentId !== req.body.commentId) {
            res.status(400).json({
              msg: "commentaire introuvable",
            });
          }
          // controle si le createur du commentaire est la personne connectée
          else if (commentUdate.commenterId !== decodedToken.id) {
            console.log("---------------------aaaa", commentId);
            res.status(400).json({
              msg: "Vous n'etes pas le proprietaire de ce commentaire",
            });
          } else {
            next();
          }
        })

        .clone();
    }
  });
};
