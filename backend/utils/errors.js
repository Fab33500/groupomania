exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo doit comporter entre 3 et 20 caracteres";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minium";

  if (
    (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) ||
    (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
  )
    errors = "Cet utilisateur existe deja ";

  return errors;
};

exports.loginErrors = (err) => {
  return (errors = { err: err.message });
};
