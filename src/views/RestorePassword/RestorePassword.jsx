import "./RestorePassword.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import { validationRestorePassword } from "../../utils/validations";
import queryString from 'query-string';
//import { restorePassword } from "../../redux/actions";
import { useDispatch } from "react-redux";

const RestorePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* States */
  const [email, setEmail] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

  /* Handlers */
  const handleLogin = () => {
    navigate("/login");
  };
  const handleVerificationEmail = () => {
    const query = queryString.stringify({ email: email.email });
    dispatch(restorePassword(email));
    navigate(`/check-email?${query}`);
  };
  const handleChange = (event) => {
    setEmail({
      ...email,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validationRestorePassword({
        ...email,
        [event.target.name]: event.target.value,
      })
    );
  };
  return (
    <section className="container-restore-password">
      <div className="restore-box">
        <div>
          <header className="title-restore-password">
            Recuperar contraseña
          </header>
        </div>
        <div className="container-text-restore">
          <p>
            Escriba su mail para que le enviemos un correo para crear una nueva
            contraseña
          </p>
        </div>
        <form className="input-box">
          <input
            type="text"
            name="email"
            className="input-field"
            placeholder=""
            autocomplete="off"
            value={email.email}
            onChange={handleChange}
          />
          <label className="label-input">Email</label>
        </form>
        <div>
          <button className="button-restore"
          disabled={
          !email.email || errors.email
          } onClick={handleVerificationEmail}>Recuperar contraseña</button>
          <div className="sign-up-link">
            <p>
            ¿Volver al inicio de sesión?
            {" "}
              <a className="a-link-login" onClick={handleLogin}>
                Click aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RestorePassword;
