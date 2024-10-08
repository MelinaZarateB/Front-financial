import "./CreateUser.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, cleanMessage } from "../../redux/actions";
import Spinner from "../../utils/Spinner/Spinner";

const CreateUser = ({ handleCreateUser }) => {
  const dispatch = useDispatch();
  const stateRegisterUser = useSelector((state) => state.registerUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(cleanMessage());
    };
  }, []);

  const [newUser, setNewUser] = useState({
    username: "",
    lastname: "",
    password: "",
    email: "",
    phone: "",
    isActive: true,
    role: "user",
  });

  /* Handlers */
  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };
  const handleSendInputs = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(registerUser(newUser));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container-parent-create-user">
      <div className="container-create-user">
        <div className="input-create-user">
          <label htmlFor="" className="label-create-user">
            Nombre
          </label>
          <input
            type="text"
            name="username"
            value={newUser.username}
            className="input-create-user-principal"
            onChange={handleChange}
          />
        </div>
        <div className="input-create-user">
          <label htmlFor="" className="label-create-user">
            Apellido
          </label>
          <input
            type="text"
            name="lastname"
            value={newUser.lastname}
            className="input-create-user-principal"
            onChange={handleChange}
          />
        </div>
        <div className="input-create-user">
          <label htmlFor="" className="label-create-user">
            Telefono
          </label>
          <input
            type="text"
            name="phone"
            value={newUser.phone}
            className="input-create-user-principal"
            onChange={handleChange}
          />
        </div>

        <div className="input-create-user">
          <label htmlFor="" className="label-create-user">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={newUser.email}
            className="input-create-user-principal"
            onChange={handleChange}
          />
        </div>
        <div className="input-create-user">
          <label htmlFor="" className="label-create-user">
            Contraseña
          </label>
          <input
            type="text"
            name="password"
            value={newUser.password}
            className="input-create-user-principal"
            onChange={handleChange}
          />
        </div>
        <div style={{ paddingTop: "7px" }}>
          {stateRegisterUser.success ? (
            <p style={{ color: "green", marginTop: "-20px" }}>
              {stateRegisterUser.message}
            </p>
          ) : (
            <p style={{ color: "red", marginTop: "-20px" }}>
              {stateRegisterUser.message}
              {stateRegisterUser.message ? (
                <span style={{ marginLeft: "5px" }}>
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
              ) : (
                ""
              )}
            </p>
          )}
        </div>
        <div className="container-buttons-create-user">
          <button
            className="btn-submit-create-user"
            onClick={handleSendInputs}
            disabled={
              !newUser.username ||
              !newUser.lastname ||
              !newUser.email ||
              !newUser.password ||
              !newUser.phone
            }
          >
            <label htmlFor="submit" className="label">
              {" "}
              {isSubmitting ? (
                <Spinner style={{ width: "20px", height: "20px" }} />
              ) : (
                "Registrar usuario"
              )}
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="white"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
          </button>
          <button
            className="btn-submit-create-user"
            onClick={() => handleCreateUser()}
          >
            Volver{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="17px"
              viewBox="0 -960 960 960"
              width="17px"
              fill="white"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
export default CreateUser;
