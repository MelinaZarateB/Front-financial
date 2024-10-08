import "./Users.css";
import { useState, useEffect } from "react";
import CreateUser from "../CreateUser/CreateUser";
import { searchUserByEmail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, cleanFilterUserByEmail } from "../../redux/actions";
import imgPencil from "./../../assets/pencil.svg";
import imgBlock from "./../../assets/block.svg";
import imgArrowRight from "./../../assets/arrow-right.svg";
import imgLupa from "./../../assets/search_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

const Users = () => {
  const [email, setEmail] = useState("");
  const [createUser, setCreateUser] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const userByEmail = useSelector((state) => state.userByEmail);
  console.log(userByEmail);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  console.log(email);

  /* Handlers */
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch(searchUserByEmail(email));
    }
  };
  const handleGetUserByEmail = () => {
    dispatch(searchUserByEmail(email));
  };
  const handleCleanFilterUserByEmail = () => {
    dispatch(cleanFilterUserByEmail());
    setEmail("");
  };
  const handleCreateUser = () => {
    if (!createUser) setCreateUser(true);
    else {
      setCreateUser(false);
    }
  };
  return (
    <section className="container-users">
        {createUser ? (
          <CreateUser />
        ) : (
      <div className="container-second-section-users">
        <div>
          <button className="btn-create-user" onClick={handleCreateUser}>
            Crear usuario
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#06571f"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
          </button>
        </div>
        <div className="container-search-purchase">
          <label htmlFor="email">Buscar usuario por email</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="text"
              className="input-search-user"
              name="email"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={email}
            />
            <button onClick={handleGetUserByEmail} className="btn-search-users">
              Buscar{" "}
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
              className="btn-clean"
              onClick={handleCleanFilterUserByEmail}
            >
              Limpiar{" "}
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
          </div>
          <div className="container-table">
            <div className="tbl-container">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Estado</th>
                    <th colSpan="2"></th>
                  </tr>
                </thead>
                <tbody>
                  {userByEmail && Object.keys(userByEmail).length > 0 ? (
                    <tr key={userByEmail._id}>
                      <td data-table="Nombre">{userByEmail.username}</td>
                      <td data-table="Apellido">{userByEmail.lastname}</td>
                      <td data-table="Email">{userByEmail.email}</td>
                      <td data-table="Estado">
                        {userByEmail.isActive ? "Activo" : "Inactivo"}
                      </td>
                      <td>
                        <button className="btn-edit">Editar</button>
                      </td>
                      <td>
                        <button className="btn-trash">Eliminar</button>
                      </td>
                    </tr>
                  ) : users && users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td data-table="Nombre">{user.username}</td>
                        <td data-table="Apellido">{user.lastname}</td>
                        <td data-table="Email">{user.email}</td>
                        <td data-table="Estado">
                          {user.isActive ? "Activo" : "Inactivo"}
                        </td>
                        <td>
                          <button className="btn-edit">Editar</button>
                        </td>
                        <td>
                          <button className="btn-trash">Eliminar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No hay usuarios disponibles</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

        )}
    </section>
  );
};

export default Users;
