import "./Login.css";
/* Hooks */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
/* Icons */
import visibilityOn from "./../../assets/visibility-on.svg";
import visibilityOff from "./../../assets/visibility-off.svg";
import { validationsLogin } from "../../utils/validations";
import Spinner from "../../utils/Spinner/Spinner";
import { useDispatch } from "react-redux";
import { login, activateAccount, cleanMessage } from "../../redux/actions";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loginMessage = useSelector((state) => state.loginMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getQueryParams = (param) => {
    return new URLSearchParams(location.search).get(param);
  };
  useEffect(() => {
    if (loginMessage === true) {
      navigate("/dashboard");
    }
  }, [loginMessage]);

  const token = getQueryParams("token");

  useEffect(() => {
    if (token) {
      dispatch(activateAccount(token));
    }
  }, [token]);
  useEffect(() => {
    return () => {
      dispatch(cleanMessage());
    };
  }, []);
  /* States*/
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isVisibilityPassword, setIsVisibilityPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const [touchedInput, setTouchedInput] = useState({});

  /* Handlers */
  const handleInputs = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(login(user));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonSignUp = () => {
    navigate("/sign-up");
  };
  const handleRestorePassword = () => {};
  const handleTouched = (inputName) => {
    setTouchedInput({
      ...touchedInput,
      [inputName]: true,
    });
  };
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validationsLogin({
        ...user,
        [event.target.name]: event.target.value,
      })
    );
  };
  const visibilityPassword = () => {
    if (isVisibilityPassword === false) setIsVisibilityPassword(true);
    else {
      setIsVisibilityPassword(false);
    }
  };

  return (
    <section className="container-login-box">
      <form className="login-box">
        <div className="login-header">
          <header>¡Bienvenido!</header>
        </div>
        <div className="container-input-login">
          <div>
            <div className="input-box">
              <input
                type="text"
                name="email"
                className="input-field"
                placeholder=""
                autocomplete="off"
                value={user.email}
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
                  autocomplete="off"
                  value={user.password}
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
          </div>
          <div className="forgot">
            <section className="section-login">
              <a
                href="#"
                className="a-link-forgot-password"
                onClick={handleRestorePassword}
              >
                Olvidé mi contraseña
              </a>
            </section>
          </div>
        </div>
        <div className="input-submit" onClick={handleInputs}>
          <button
            className="submit-btn"
            type="submit"
            id="submit"
            disabled={
              !user.email || errors.email || !user.password || errors.password
            }
          ></button>
          <label htmlFor="submit">
            {" "}
            {isSubmitting ? <Spinner /> : "Ingresar"}
          </label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          {loginMessage !== true && loginMessage !== "" ? (
            <p style={{ color: "red", display: "flex", gap: "5px" }}>
              {loginMessage}
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
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="sign-up-link">
          <p>
            ¿No tienes una cuenta?{" "}
            <a onClick={handleButtonSignUp} className="a-link-login">
              Regístrate acá
            </a>
          </p>
        </div>
      </form>
    </section>
  );
};
export default Login;
