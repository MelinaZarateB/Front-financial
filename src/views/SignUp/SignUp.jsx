import "./SignUp.css";
import { useState } from "react";
import visibilityOff from "./../../assets/visibility-off.svg";
import visibilityOn from "./../../assets/visibility-on.svg";
import warning from './../../assets/warning.svg';

const SignUp = () => {
  /* States */
  const [newUser, setNewUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [isVisibilityPassword, setIsVisibilityPassword] = useState(false);
  const [touchedInput, setTouchedInput] = useState({});
  const [errors, setErrors] = useState({});
  /* Handlers */
  const visibilityPassword = () => {
    if (isVisibilityPassword === false) setIsVisibilityPassword(true);
    else {
      setIsVisibilityPassword(false);
    }
  };
  const handleTouched = (inputName) => {
    setTouchedInput({
      ...touchedInput,
      [inputName]: true,
    });
  };
  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validationsLogin({
        ...user,
        [event.target.name]: event.target.value,
      })
    );
  };
  return (
    <section className="container-sign-up">
      <form className="sign-up-box">
        <div className="sign-up-header">
          <header>¡Registrate!</header>
        </div>
        <div className="container-input-sign-up">
        <div>
            <div className="input-box">
              <input
                type="text"
                name="name"
                className="input-field"
                placeholder=""
                autoComplete="off"
                value={newUser.name}
                onChange={handleChange}
                onBlur={() => handleTouched("name")}
              />
              <label className="label-input">Nombre*</label>
            </div>
          </div>
          <div>
            <div className="input-box">
              <input
                type="text"
                name="lastname"
                className="input-field"
                placeholder=""
                autoComplete="off"
                value={newUser.lastname}
                onChange={handleChange}
                onBlur={() => handleTouched("lastname")}
              />
              <label className="label-input">Apellido*</label>
            </div>
          </div>
          <div>
            <div className="input-box">
              <input
                type="text"
                name="email"
                className="input-field"
                placeholder=""
                autoComplete="off"
                value={newUser.email}
                onChange={handleChange}
                onBlur={() => handleTouched("email")}
              />
              <label className="label-input">Email*</label>
            </div>
          </div>
          <div>
            <div className="input-box password">
              <div className="input-child-password">
                <input
                  type={isVisibilityPassword ? "text" : "password"}
                  name="password"
                  className="input-field password"
                  placeholder=""
                  autoComplete="off"
                  value={newUser.password}
                  onChange={handleChange}
                  onBlur={() => handleTouched("password")}
                />
                <label className="label-input">Contraseña*</label>
                {isVisibilityPassword === false ? (
                  <img
                    src={visibilityOff}
                    style={{ cursor: "pointer" }}
                    onClick={visibilityPassword}
                  />
                ) : (
                  <img
                    src={visibilityOn}
                    style={{ cursor: "pointer" }}
                    onClick={visibilityPassword}
                  ></img>
                )}
              </div>
            </div>
            <div className="section-password-request">
                <ul className="grid-section-request">
                  <div>
                    <li className="li-password">
                      {" "}
                      <img src={warning} /> Mínimo 8 caracteres
                    </li>
                    <li className="li-password">
                      <img src={warning} /> Un caracter especial
                    </li>
                  </div>
                  <div>
                    <li className="li-password">
                      <img src={warning} /> Una letra mayúscula
                    </li>
                    <li className="li-password">
                      <img src={warning} /> Al menos un número
                    </li>
                  </div>
                </ul>
              </div>
          </div>
        </div>
        <div className="input-submit">
          <button
            className="submit-btn"
            type="submit"
            id="submit"
            disabled={
              !newUser.name || errors.name || !newUser.email || errors.email || !newUser.password || errors.password 
            }
          >
            Registrarse
          </button>
        </div>
        <div className="sign-up-link">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <a  className="a-link-login">
                Ingresa acá
              </a>
            </p>
          </div>
      </form>
    </section>
  );
};
export default SignUp;
