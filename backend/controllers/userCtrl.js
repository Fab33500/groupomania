const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const fs = require("fs");

// afficher tous les users
exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select("-password ");
  res.status(200).json(users);
};

// afficher un user
exports.getOneUser = async (req, res) => {
  try {
    const user = await userModel
      .findById({ _id: req.params.id })
      .select("-password")
      .exec();

    // verifie si user est dans la bdd
    if (user === null) {
      res.status(404).json({ msg: "L'user n'existe pas" });
    } else {
      res.status(200).json({ msg: user });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// mise à jour du compte user

exports.updateUser = async (req, res) => {
  // verification si user existe
  const verifUser = await userModel.findById({ _id: req.params.id });

  // const user = await userModel.findById(decodedToken.id);
  console.log("xxxxxxxxxx--user---xxxxxxxxx", req.userToken.id); // id recuperé du token

  try {
    if (verifUser) {
      const user = await userModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          ...req.body, //controler si les champs sont vides
          _id: req.params.id,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      // res.send(req.userToken.id);// id recuperé du token

      res.status(200).json({
        msg: `Votre compte utilisateur numero: ${req.params.id} a été modifié`,
        user,
      });
    } else {
      res.status(404).json({
        message: `Ce compte utilisateur numéro: ${req.params.id} n'existe plus`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// suppression du compte user
exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.params.id });
    const post = await postModel.find({
      posterId: req.userToken.id,
    });
    if (user.image) {
      const filename = user.image.split("/public/uploads/img/")[1];
      // suppression de l'image dans le dossier img
      fs.unlink(`public/uploads/img/${filename}`, (error) => {
        if (error) console.log(error);
      });
    }
    // verifie si compte existe dans la bdd
    if (user) {
      // // supprime l'utilisateur
      await userModel.remove({ _id: req.params.id }).exec();
      res
        .status(200)
        .json({ msg: `utilisateur numéro: ${req.params.id} supprimé` });

      if (post) {
        const postImage = await postModel.find({ image: { $exists: true } });

        // recherche tous les posts
        for (var i = 0; i < postImage.length; ++i) {
          const postImageDelete = postImage[i];

          // suppression des images dans le dossier img si elles appartienent à user effacé
          if (postImageDelete.posterId === req.userToken.id) {
            const filename = postImageDelete.image.split(
              "/public/uploads/img/"
            )[1];

            fs.unlink(`public/uploads/img/${filename}`, (error) => {
              if (error) console.log(error);
            });
          }
        }

        // supprime les posts de l'utilisateur
        await postModel.remove({ posterId: req.userToken.id }).exec();
      }
    } else {
      res.status(404).json({
        message: `Ce compte utilisateur numéro: ${req.params.id} n'existe plus`,
      });
    }
  } catch (err) {
    res.status(500).json({ msg: "l'user n'existe pas" });
  }
};
