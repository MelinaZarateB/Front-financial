import './Login.css';
/* Hooks */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
/* Icons */
import visibilityOn from "./../../assets/visibility-on.svg";
import visibilityOff from "./../../assets/visibility-off.svg";
import validationsLogin from '../../utils/validations';

const Login = () => {
 const navigate = useNavigate()
  /* States*/
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isVisibilityPassword, setIsVisibilityPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const [touchedInput, setTouchedInput] = useState({});

  /* Handlers */
  const handleButtonSignUp = () => {
    navigate('/sign-up')
  };
  const handleRestorePassword = () => {
    
  }
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
              <a href="#" className="a-link-forgot-password" onClick={handleRestorePassword}>
                Olvidé mi contraseña
              </a>
            </section>
          </div>
        </div>
        <div className="input-submit">
          <button 
          className="submit-btn" 
          type="submit"
          id="submit"
          disabled={
            !user.email || errors.email || !user.password ||
            errors.password
          }>Ingresar</button>
          <label htmlFor="submit"
        ></label>
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