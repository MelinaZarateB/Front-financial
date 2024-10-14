import "./AdminUsers.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import imgPencil from './../../assets/pencil.svg';
import {
  cleanFilterUserByEmail,
  searchUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser
} from "../../redux/actions";
import Swal from 'sweetalert2'

const AdminUsers = ({ handleCreateUser }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const users = useSelector((state) => state.users);
  const userByEmail = useSelector((state) => state.userByEmail);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    document.querySelectorAll('[data-editable]').forEach(function (item) {
      item.addEventListener('click', function () {
        const userId = item.dataset.userId; // Identificar el usuario
        const fieldName = item.dataset.field; // Campo que se está editando
        const input = document.createElement('input');
        input.className = item.className;
        input.dataset.editableInput = true;
        input.value = item.dataset.editable;
        
        input.addEventListener('blur', function () {
          if (input.value) {
            item.dataset.editable = input.value;
            // Restaura el texto y la imagen del lápiz
            item.innerHTML = `${input.value} <img src="${imgPencil}" alt="" />`;
            // Dispatch para actualizar el valor después del blur
            dispatch(updateUser(userId, { [fieldName]: input.value }));
          }
          input.replaceWith(item);
        });

        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
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
      icon: 'warning',
      showCancelButton: true, // Muestra el botón de cancelar
      confirmButtonText: 'Eliminar', // Texto del botón de confirmación
      cancelButtonText: 'Cancelar', // Texto del botón de cancelación
      reverseButtons: true, // Opcional: intercambia el orden de los botones
      customClass: {
        confirmButton: 'my-confirm-button', // Clase personalizada para el botón de confirmación
        cancelButton: 'my-cancel-button',   // Clase personalizada para el botón de cancelación
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, ejecutamos la acción deleteUser
        dispatch(deleteUser(userId));
      } 
    });
  };
  

  return (
    <div className="container-second-section-users">
      <div>
        <button className="btn-create-user" onClick={handleCreateUser}>
          Registrar usuario
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
              fill="#06571f"
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
                      <button className="btn-trash" onClick={() => handleDeleteUser(userByEmail._id)}>Eliminar</button>
                    </td>
                  </tr>
                ) : users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td data-table="Nombre">
                        <span data-editable={user.username} data-user-id={user._id} data-field="username">
                          {user.username} <img src={imgPencil} alt="" />
                        </span>
                      </td>
                      <td data-table="Apellido">
                        <span data-editable={user.lastname} data-user-id={user._id} data-field="lastname">
                          {user.lastname} <img src={imgPencil} alt="" />
                        </span>
                      </td>
                      <td data-table="Email">
                        <span data-editable={user.email} data-user-id={user._id} data-field="email">
                          {user.email} <img src={imgPencil} alt="" />
                        </span>
                      </td>
                      <td data-table="Estado">
                        {user.isActive ? "Activo" : "Inactivo"}
                      </td>
                      <td>
                        <button className="btn-trash" onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
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
