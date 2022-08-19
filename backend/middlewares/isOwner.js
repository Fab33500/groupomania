module.exports = async (req, res, next) => {
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
