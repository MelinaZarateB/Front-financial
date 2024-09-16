import "./SignUp.css";
import { useState } from "react";
import visibilityOff from "./../../assets/visibility-off.svg";
import visibilityOn from "./../../assets/visibility-on.svg";
import warning from './../../assets/warning.svg';
import alert from './../../assets/alert.svg';
import { useNavigate } from "react-router-dom";
import { validationsSignUp } from "../../utils/validations";

const SignUp = () => {
  const navigate = useNavigate()
  /* States */
  const [newUser, setNewUser] = useState({
    username: "",
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
      validationsSignUp({
        ...newUser,
        [event.target.name]: event.target.value,
      })
    );
  };
  const handleLogin = () => {
    navigate('/')
  }
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
                name="username"
                className="input-field"
                placeholder=""
                autoComplete="off"
                value={newUser.username}
                onChange={handleChange}
                onBlur={() => handleTouched("username")}
              />
              <label className="label-input">Nombre*</label>
              {errors.username && touchedInput.username && (
                  <span className="span">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-exclamation-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                  </span>
                )}
            </div>
            {errors.username && touchedInput.username && (
                <p
                  style={{ color: "red", marginTop: "4px", marginLeft: "20px" }}
                >
                  {errors.username}
                </p>
              )}
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
              {errors.username && touchedInput.username && (
                  <span className="span">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-exclamation-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                  </span>
                )}
            </div>
            {errors.lastname && touchedInput.lastname && (
                <p
                  style={{ color: "red", marginTop: "4px", marginLeft: "20px" }}
                >
                  {errors.lastname}
                </p>
              )}
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
              {errors.email && touchedInput.email && (
                  <span className="span">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-exclamation-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                  </span>
                )}
            </div>
            {errors.email && touchedInput.email && (
                <p
                  style={{ color: "red", marginTop: "4px", marginLeft: "20px" }}
                >
                  {errors.email}
                </p>
              )}
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
                {errors.password && touchedInput.password && (
                  <span className="span password">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-exclamation-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                  </span>
                )}
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
              {errors.password && touchedInput.password && (
                <p
                  style={{ color: "red", marginTop: "4px", marginLeft: "20px" }}
                >
                  {errors.password}
                </p>
              )}
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
              <a className="a-link-login" onClick={handleLogin}>
                Ingresa acá
              </a>
            </p>
          </div>
      </form>
    </section>
  );
};
export default SignUp;
