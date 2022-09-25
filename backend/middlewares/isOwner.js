const postModel = require("../models/postModel");
const { isOwnerErrors, isPostOwnerErrors } = require("../utils/errors");

exports.isOwner = async (req, res, next) => {
  // controle l'utilisateur qui fait la requete à user ID
  // si ce n'est pas le proprietaire:
  if (req.params.id !== req.userToken.id) {
    console.log("----------------isoner--------", req.userToken.id); // id recuperé du token
    console.log("user token cookie ---------------", req.params.id);
    const errors = isOwnerErrors();
    return res.status(401).json(errors);
  }
  // si la requete est faite par le propriétaire
  else {
    next();
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
