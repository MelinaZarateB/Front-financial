import "./SignUpVerification.css";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";

const SignUpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = queryString.parse(location.search);

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <section className="container-verification-box">
      <div className="verification-box">
        <div className="header-verification">
          <header>¡Listo!</header>
          <header>Revise su correo</header>
        </div>
        <div className="container-description-verification">
          <p>
            Le hemos enviado las instrucciones para 
            verificar su cuenta al siguiente correo:
          </p>
          <div className="input-email-verification">{email}</div>
          <div>
            <p>
            Siga los pasos del mail para verificar su dirección de correo electrónico.
            </p>
          </div>
        </div>
        <button onClick={handleLogin} className="button-verification">Iniciar sesion aquí</button>
      </div>
    </section>
  );
};
export default SignUpVerification;
