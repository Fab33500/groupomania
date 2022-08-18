const userModel = require("../models/userModel");

const ObjectID = require("mongoose").Types.ObjectId;

// afficher tous les users
exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select("-password ");
  res.status(200).json(users);
};

// afficher un user
exports.getOneUser = async (req, res) => {
  // verification si Id existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json(`Id :  ${req.params.id}  inconnu `);

  try {
    const user = await userModel
      .findById({ _id: req.params.id })
      .select("-password")
      .exec();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// mise à jour du compte user

// a faire: si le compte n'existe pas en bd interdire la creation en faisant un update

exports.updateUser = async (req, res) => {
  // verification si Id correct dans params
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json(`Id :  ${req.params.id}  inconnu `);

  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res
      .status(200)
      .json({ msg: `utilisateur ${req.params.id} a été modifié`, user });
    console.log("<<<<<", user._id);
  } catch (err) {
    res.status(500).json(err);
  }
};

// suppression du compte user
exports.deleteUser = async (req, res) => {
  // verification si Id existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json(`Id :  ${req.params.id}  inconnu `);

  try {
    await userModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ msg: `utilisateur ${req.params.id} supprimé` });
  } catch (err) {
    res.status(500).json(err);
  }
};
