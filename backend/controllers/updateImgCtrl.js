const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const fs = require("fs");
// const path = require("path");

// upload avatar
exports.updateProfil = async (req, res) => {
  const user = await userModel.findById({ _id: req.params.id });

  const userObject = req.file
    ? {
        image: `${req.protocol}://${req.get("host")}/public/uploads/img/${
          req.file.filename
        }`,
      }
    : { ...req.body.user };

  try {
    // modifie l'avatar par defaut
    if (req.file) {
      const filename = user.image.split("/public/uploads/img/")[1];

      if (req.file.fieldname) {
        // suppression de l'image dans le dossier img
        fs.unlink(`public/uploads/img/${filename}`, (error) => {
          if (error) console.log(error);
        });

        await userModel.findByIdAndUpdate(
          { _id: req.params.id },
          {
            ...userObject,
          }
        );
        res.status(200).json({ msg: "Votre avatar a été modifié", userObject });
      }
    } else {
      res.status(400).json({
        msg: "Seul les fichier .png , .Jpeg , .jpg, .gif , sont autorisés",
      });
    }
  } catch (err) {
    res.status(410).json(err);
  }
};

// upload image post

exports.updatePostImg = async (req, res) => {
  const post = await postModel.findById({ _id: req.params.id });

  const postObject = req.file
    ? {
        image: `${req.protocol}://${req.get("host")}/public/uploads/img/${
          req.file.filename
        }`,
      }
    : { ...req.body.post };

  try {
    if (req.file) {
      // ajout de l'image si elle n'existe pas
      if (post.image === undefined) {
        await postModel.findByIdAndUpdate(
          { _id: req.params.id },
          {
            ...postObject,
          }
        );
        res
          .status(200)
          .json({ msg: "L'image du post a été ajouté", postObject });
      } else {
        // modifie l'image si existe
        const filename = post.image.split("/public/uploads/img/")[1];

        // suppression de l'image dans le dossier img
        if (req.file.fieldname) {
          fs.unlink(`public/uploads/img/${filename}`, (error) => {
            if (error) console.log(error);
          });

          await postModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
              ...postObject,
            }
          );
          res
            .status(200)
            .json({ msg: "L'image du post a été modifié", postObject });
        }
      }
    } else {
      res.status(400).json({
        msg: "Seul les fichier .png , .Jpeg , .jpg, .gif , sont autorisés",
      });
    }
  } catch (err) {
    res.status(410).json(err);
  }
};
