// *************************** gestion des erreurs controller authUserctrl ********************

// ------------------- erreur signup -------------------//
exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo doit comporter entre 3 et 20 caracteres";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minium";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  return errors;
};

// ------------------- erreur login -------------------//
exports.loginErrors = (err) => {
  return (errors = { err: err.message });
};

// *************************** gestion des erreurs middleware auth ********************
// ------------------- erreur auth -------------------//
exports.authErrors = (err) => {
  return (errors = { err: "token d'authentification invalide !!" });
};

// *************************** gestion des erreurs middleware passwordvalidator ********************
// ------------------- erreur passwordvalidator -------------------//
exports.passwordValidatorErrors = (err) => {
  return (errors = {
    error: `le mot de passe n'est pas assez fort , il doit etre compose de : entre 5 et 10 caracteres, sans espace, minimum 1 Majuscules et 1 Minuscules, 1 chiffre,`,
  });
};
