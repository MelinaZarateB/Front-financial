import "./CreateUser.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions";

const CreateUser = ({handleCreateUser}) => {
  const dispatch = useDispatch();

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
  const handleSendInputs = () => {
    dispatch(registerUser(newUser));
  };

  return (
    <section>
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
            Registrar usuario
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
          <button className="btn-submit-create-user" onClick={() => handleCreateUser()}>
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
