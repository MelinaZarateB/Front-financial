import "./ChangePassword.css";
import { useState, useEffect } from "react";
import visibilityOff from "./../../assets/visibility-off.svg";
import visibilityOn from "./../../assets/visibility-on.svg";
import warning from "./../../assets/warning.svg";
import { changePassword } from "../../utils/validations";
import { changePasswordAction } from "../../redux/actions";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../utils/Spinner/Spinner";

const ChangePassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [touchedInput, setTouchedInput] = useState({});
  const changePasswordMessage = useSelector(
    (state) => state.changePasswordMessage
  );

  const getQueryParams = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  const token = getQueryParams("token");

  /* States */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState({
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isVisibilityPassword, setIsVisibilityPassword] = useState(false);

  useEffect(() => {
    if (changePasswordMessage.message) {
      setIsSubmitting(false);
    }
  }, [changePasswordMessage]);

  /* Handlers */
  const visibilityPassword = () => {
    if (isVisibilityPassword === false) setIsVisibilityPassword(true);
    else {
      setIsVisibilityPassword(false);
    }
  };
  const handleChangePassword = async () => {
    setIsSubmitting(true);

    dispatch(changePasswordAction(token, password.password));
  };
  const handleChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
    setErrors(
      changePassword({
        ...password,
        [event.target.name]: event.target.value,
      })
    );
  };
  const handleLogin = () => {
    navigate("/");
  };
  return (
    <section className="container-change-password">
      <div className="change-password-box">
        <div className="title-change-password">
          <header>Recuperar contraseña</header>
        </div>
        <div className="container-description-change-password">
          <p>
            Ingrese la nueva contraseña con la que se registrara posteriormente
          </p>
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
                  value={setPassword.password}
                  onChange={handleChange}
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
        </div>
        <div className="input-submit">
          <button
            className="submit-btn"
            onClick={handleChangePassword}
            disabled={!password.password || errors.password}
          ></button>
          <label htmlFor="submit" className="label">
            {" "}
            {isSubmitting ? <Spinner /> : "Cambiar contraseña"}
          </label>
        </div>
        {changePasswordMessage.success ? (
          <p
            style={{ color: "green", textAlign: "center", marginTop: "-25px" }}
          >
            {changePasswordMessage.message}
          </p>
        ) : (
          <p style={{ color: "red", textAlign: "center", marginTop: "-25px"}}>
            {changePasswordMessage.message}
            {changePasswordMessage.message ? (
            <span style={{marginLeft: '5px'}}>
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
            ) : ''}
          </p>
        )}
      <div className="sign-up-link" style={{marginTop: 0}}>
            <p>
            ¿Volver al inicio de sesión?
            {" "}
              <a className="a-link-login" onClick={handleLogin}>
                Click aquí
              </a>
            </p>
          </div>
      </div>
    </section>
  );
};
export default ChangePassword;
