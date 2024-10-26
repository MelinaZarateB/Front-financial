import "./AdminUsers.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import imgPencil from "./../../assets/pencil.svg";
import imgTrash from "./../../assets/apartment_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import {
  cleanFilterUserByEmail,
  searchUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../redux/actions";
import Swal from "sweetalert2";

const AdminUsers = ({ handleCreateUser }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const users = useSelector((state) => state.users);
  const userByEmail = useSelector((state) => state.userByEmail);
  const [selectType, setSelectType] = useState("");
  const [viewForm, setViewForm] = useState(false);
  const [type, setType] = useState("");

  const [newUser, setNewUser] = useState({
    username: "",
    lastname: "",
    password: "",
    email: "",
    phone: "",
    isActive: true,
    role: "user",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    document.querySelectorAll("[data-editable]").forEach(function (item) {
      item.addEventListener("click", function () {
        const userId = item.dataset.userId; // Identificar el usuario
        const fieldName = item.dataset.field; // Campo que se está editando
        const input = document.createElement("input");
        input.className = item.className;
        input.dataset.editableInput = true;
        input.value = item.dataset.editable;

        input.addEventListener("blur", function () {
          if (input.value) {
            item.dataset.editable = input.value;
            // Restaura el texto y la imagen del lápiz
            item.innerHTML = `${input.value} <img src="${imgPencil}" alt="" />`;
            // Dispatch para actualizar el valor después del blur
            dispatch(updateUser(userId, { [fieldName]: input.value }));
          }
          input.replaceWith(item);
        });

        input.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            input.blur(); // Desencadena el blur, lo que actualiza y despacha la acción
          }
        });

        item.replaceWith(input);
        input.focus();
      });
    });
  }, [dispatch, users]); // Asegúrate de que este efecto se ejecute cuando los usuarios cambien

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
  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar este usuario?",
      icon: "warning",
      showCancelButton: true, // Muestra el botón de cancelar
      confirmButtonText: "Eliminar", // Texto del botón de confirmación
      cancelButtonText: "Cancelar", // Texto del botón de cancelación
      reverseButtons: true, // Opcional: intercambia el orden de los botones
      customClass: {
        confirmButton: "my-confirm-button", // Clase personalizada para el botón de confirmación
        cancelButton: "my-cancel-button", // Clase personalizada para el botón de cancelación
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, ejecutamos la acción deleteUser
        dispatch(deleteUser(userId));
      }
    });
  };
  const handleChangeType = (event) => {
    setSelectType(event.target.value);
  };
  const changeForm = () => {
    if (viewForm === false) setViewForm(true);
    else {
      setViewForm(false);
    }
  };
  const handleChangeNewUser = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="container-second-section-users">
      <div>
        <button
          className="btn-create-user"
          onClick={changeForm}
          style={{
            borderBottomLeftRadius: viewForm ? "0px" : "4px",
            borderBottomRightRadius: viewForm ? "0px" : "4px",
          }}
        >
          Registrar usuario
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#06571f"
            style={{transform: viewForm ? 'rotate(-90deg)' : '', transition: 'all 0.2s ease-in-out'}}
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </button>

        <div className={`form-container ${viewForm ? "open" : ""}`}>
          <form
            action=""
            className="form-dashboard"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-columns">
              {/* Primera columna con los inputs apilados */}
              <div className="inputs-column">
                <div className="input-box-dashboard">
                  <input
                    type="text"
                    className="input-field-dashboard"
                    name="username"
                    value={newUser.username}
                    onChange={handleChangeNewUser}
                  />
                  <label
                    className="label-input-dashboard"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Nombre
                  </label>
                </div>
                <div className="input-box-dashboard">
                  <input
                    type="text"
                    className="input-field-dashboard"
                    name="lastname"
                    value={newUser.email}
                    onChange={handleChangeNewUser}
                  />
                  <label
                    className="label-input-dashboard"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Apellido
                  </label>
                </div>
                <div className="input-box-dashboard">
                  <input
                    type="text"
                    className="input-field-dashboard"
                    name="email"
                    value={newUser.lastname}
                    onChange={handleChangeNewUser}
                  />
                  <label
                    className="label-input-dashboard"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Email
                  </label>
                </div>
              </div>

              <div className="input-box-dashboard">
                <div
                  className={`select-container ${
                    selectType ? "has-value" : ""
                  }`}
                >
                  <select
                    name="typeExpense"
                    className="input-field-dashboard select"
                    style={{
                      color: selectType ? "#000" : "#555",
                      cursor: "pointer",
                    }}
                  >
                    <option value="all">Asignar sucursal</option>
                  </select>
                  <div
                    className="floating-label"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Sucursal
                  </div>
                </div>
              </div>
            </div>

            <div
              className="buttons-container"
              style={{ display: "flex", gap: "5px", justifyContent: "end" }}
            >
              <button className="btn-search-users">
                Registrar{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#06571f"
                >
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
              </button>
              <button className="btn-search-users" onClick={changeForm}>
                Cerrar{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="17px"
                  viewBox="0 -960 960 960"
                  width="17px"
                  fill="#06571f"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container-search-purchase">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "3px",
          }}
        >
          <div className="input-box-dashboard">
            <input
              type="text"
              className="input-field-dashboard"
              name="email"
              onChange={handleChange}
              value={email}
            />
            <label htmlFor="email" className="label-input-dashboard">
              Buscar usuario por email
            </label>
          </div>
          <button onClick={handleGetUserByEmail} className="btn-search-users">
            Buscar{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#06571f"
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
              fill="rgba(255, 255, 255, 0.83)"
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
                  <th colSpan="1"></th>
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
                      <button
                        className="btn-trash"
                        onClick={() => handleDeleteUser(userByEmail._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ) : users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td data-table="Nombre">
                        <span
                          data-editable={user.username}
                          data-user-id={user._id}
                          data-field="username"
                        >
                          {user.username} <img src={imgPencil} alt="" />
                        </span>
                      </td>
                      <td data-table="Apellido">
                        <span
                          data-editable={user.lastname}
                          data-user-id={user._id}
                          data-field="lastname"
                        >
                          {user.lastname} <img src={imgPencil} alt="" />
                        </span>
                      </td>
                      <td data-table="Email">
                        <span
                          data-editable={user.email}
                          data-user-id={user._id}
                          data-field="email"
                        >
                          {user.email} <img src={imgPencil} alt="" />
                        </span>
                      </td>
                      <td data-table="Estado">
                        {user.isActive ? "Activo" : "Inactivo"}
                      </td>
                      <td>
                        <button
                          className="btn-trash"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Eliminar
                        </button>
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
