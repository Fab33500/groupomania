const postModel = require("../models/postModel");

exports.isOwner = async (req, res, next) => {
  // controle l'utilisateur qui fait la requete à user ID
  // si ce n'est pas le proprietaire:
  if (req.params.id !== req.auth.userId) {
    console.log("-----------req param", req.params.id);
    console.log("req auth----------", req.auth.userId);
    return res.status(401).json({
      msg: " vous n'etes pas le proprietaire du compte!!",
    });
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
      if (newPost.posterId === req.auth.userId) {
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
        return res.status(403).json({
          msg: " vous n'etes pas le proprietaire de ce post!!",
        });
      }
    })
    .catch((error) =>
      res.status(500).send(`ID du post : ${req.params.id} n'existe pas`)
    );
};
