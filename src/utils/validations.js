const validationsLogin = (inputs) => {
  const errors = {};

  if (inputs.email.trim() === "") {
    errors.email = "Campo requerido";
  } else if (!regexEmail.test(inputs.email)) {
    errors.email = "Email inválido";
  }
  if (inputs.password.trim() === "") {
    errors.password = "Campo requerido";
  }
  return errors;
};
export default validationsLogin;
