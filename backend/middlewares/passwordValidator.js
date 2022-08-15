const passwordValidator = require("password-validator");

// creation du schema
const passwordSchema = new passwordValidator();

// le schéma que doit respecter le mot de passe
passwordSchema
  .is()
  .min(5) // Longueur Mini 5
  .is()
  .max(10) // Longueur Maxi 10
  .has()
  .uppercase() // Doit contenir des lettres majuscules
  .has()
  .lowercase() // Doit contenir des lettres minuscules
  .has()
  .digits(1) // Doit avoir au moins 1 chiffre
  .has()
  .not()
  .spaces() // Ne devrait pas avoir d'espaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist les valeurs

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error: `le mot de passe :[ ${req.body.password} ] n'est pas assez fort , il doit etre compose de : entre 5 et 10 caracteres, sans espace, minimum 1 Majuscules et 1 Minuscules, 1 chiffre,`,
    });
  }
};
