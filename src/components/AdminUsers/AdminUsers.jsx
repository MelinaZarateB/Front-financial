import "./AdminUsers.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanFilterUserByEmail,
  searchUserByEmail,
  getAllUsers,
} from "../../redux/actions";

const AdminUsers = ({ handleCreateUser }) => {

  document.querySelectorAll('[data-editable]').forEach(function(item){
    item.addEventListener('click', function() {
      const input = document.createElement('input')
      input.className = item.className
      input.dataset.editableInput = true
      input.value = item.dataset.editable 
      input.addEventListener('blur', function() {
        if(input.value) {
          item.dataset.editable = input.value
          item.textContent = input.value
        }
        input.replaceWith(item)
      })
      input.addEventListener('keydown', function(e){
        if(e.key == 'Enter') {
          e.preventDefault()
          input.blur()
        }
      })
      item.replaceWith(input)
      input.focus()
    })
  })
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const users = useSelector((state) => state.users);
  const userByEmail = useSelector((state) => state.userByEmail);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  /* Handlers */
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleGetUserByEmail = () => {
    dispatch(searchUserByEmail(email));
  };
  const handleCleanFilterUserByEmail = () => {
    dispatch(cleanFilterUserByEmail());
    setEmail("");
  };
  return (
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
          <button className="btn-clean" onClick={handleCleanFilterUserByEmail}>
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
                      <td data-table="Nombre">
                        <span data-editable={user.username}>{user.username}</span>
                      </td>
                      <td data-table="Apellido">
                        <span data-editable={user.lastname}>{user.lastname}</span>
                      </td>
                      <td data-table="Email">
                        <span data-editable={user.email}>{user.email}</span>
                      </td>
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
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No hay usuarios disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminUsers;
