const userModel = require("../models/userModel");
const fs = require("fs");
const path = require("path");

// upload avatar
exports.updateProfil = async (req, res) => {
  const user = await userModel.findById({ _id: req.params.id });

  const userObject = req.file
    ? {
        avatar: `${req.protocol}://${req.get(
          "host"
        )}/public/uploads/userAvatar/${req.file.filename}`,
      }
    : { ...req.body.user };

  try {
    if (req.file) {
      const filename = user.avatar.split("/public/uploads/userAvatar/")[1];

      if (req.file.fieldname) {
        fs.unlink(`public/uploads/userAvatar//${filename}`, (error) => {
          if (error) console.log(error);
        });

        const user = await userModel.findByIdAndUpdate(
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
    res.status(500).json(err);
  }
};
