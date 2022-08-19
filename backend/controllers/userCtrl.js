const userModel = require("../models/userModel");

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

// a faire: si le compte n'existe pas en bd interdire la creation en faisant un update

exports.updateUser = async (req, res) => {
  // verification si user existe
  const verifUser = await userModel.findById({ _id: req.params.id });

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

    // verifie si compte existe dans la bdd
    if (user) {
      await userModel.remove({ _id: req.params.id }).exec();
      res
        .status(200)
        .json({ msg: `utilisateur numéro: ${req.params.id} supprimé` });
    } else {
      res.status(404).json({
        message: `Ce compte utilisateur numéro: ${req.params.id} n'existe plus`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
