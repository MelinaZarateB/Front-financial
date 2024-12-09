import "./AdminUsers.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanFilterUserByEmail,
  searchUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../redux/actions/userActions";
import Swal from "sweetalert2";
import { useRef, useCallback } from "react";

const AdminUsers = ({ handleCreateUser }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const users = useSelector((state) => state.user.users);
  const userByEmail = useSelector((state) => state.user.userByEmail);
  console.log(email)
  console.log('Estado global de usuario obtenido por mail', userByEmail)
  const [selectType, setSelectType] = useState("");
  const [viewForm, setViewForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const tableRef = useRef(null);

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

  const handleClickOutside = useCallback((event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditingUser(null);
      setEditedFields({});
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      customClass: {
        confirmButton: "my-confirm-button",
        cancelButton: "my-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(userId));
      }
    });
  };

  const handleChangeType = (event) => {
    setSelectType(event.target.value);
  };

  const changeForm = () => {
    setViewForm(!viewForm);
  };

  const handleChangeNewUser = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setEditedFields({
      username: user.username,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleEditChange = (field, value) => {
    setEditedFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    const userToUpdate = editingUser === userByEmail._id ? userByEmail : users.find(u => u._id === editingUser);
    if (!userToUpdate) return;

    const hasChanges = Object.keys(editedFields).some(key => editedFields[key] !== userToUpdate[key]);

    if (hasChanges) {
      dispatch(updateUser(editingUser, editedFields));
    }

    setEditingUser(null);
    setEditedFields({});
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
        {/* Users table */}
        <div className="container-table" ref={tableRef}>
          <div className="tbl-container">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Estado</th>
                  <th colSpan="2">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {userByEmail && Object.keys(userByEmail).length > 0 ? (
                <tr key={userByEmail._id}>
                  <td data-table="Nombre">
                    {editingUser === userByEmail._id ? (
                      <input
                        type="text"
                        className="input-transaction"
                        value={editedFields.username}
                        onChange={(e) => handleEditChange('username', e.target.value)}
                      />
                    ) : (
                      userByEmail.username
                    )}
                  </td>
                  <td data-table="Apellido">
                    {editingUser === userByEmail._id ? (
                      <input
                        className="input-transaction"
                        type="text"
                        value={editedFields.lastname}
                        onChange={(e) => handleEditChange('lastname', e.target.value)}
                      />
                    ) : (
                      userByEmail.lastname
                    )}
                  </td>
                  <td data-table="Email">
                    {editingUser === userByEmail._id ? (
                      <input
                        className="input-transaction"
                        type="email"
                        value={editedFields.email}
                        onChange={(e) => handleEditChange('email', e.target.value)}
                      />
                    ) : (
                      userByEmail.email
                    )}
                  </td>
                  <td data-table="Telefono">
                    {editingUser === userByEmail._id ? (
                      <input
                        className="input-transaction"
                        type="tel"
                        value={editedFields.phone}
                        onChange={(e) => handleEditChange('phone', e.target.value)}
                      />
                    ) : (
                      userByEmail.phone ? userByEmail.phone : 'N/A'
                    )}
                  </td>
                  <td data-table="Estado">
                    {userByEmail.isActive ? "Activo" : "Inactivo"}
                  </td>
                  <td>
                    <button
                      className="btn-edit btn-new-client"
                      onClick={() => editingUser === userByEmail._id ? handleSaveEdit() : handleEditClick(userByEmail)}
                    >
                      {editingUser === userByEmail._id ? 'Guardar' : 'Editar'}
                    </button>
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
                        {editingUser === user._id ? (
                          <input
                            type="text"
                            className="input-transaction"
                            value={editedFields.username}
                            onChange={(e) => handleEditChange('username', e.target.value)}
                          />
                        ) : (
                          user.username
                        )}
                      </td>
                      <td data-table="Apellido">
                        {editingUser === user._id ? (
                          <input
                            className="input-transaction"
                            type="text"
                            value={editedFields.lastname}
                            onChange={(e) => handleEditChange('lastname', e.target.value)}
                          />
                        ) : (
                          user.lastname
                        )}
                      </td>
                      <td data-table="Email">
                        {editingUser === user._id ? (
                          <input
                            className="input-transaction"
                            type="email"
                            value={editedFields.email}
                            onChange={(e) => handleEditChange('email', e.target.value)}
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td data-table="Telefono">
                        {editingUser === user._id ? (
                          <input
                            className="input-transaction"
                            type="tel"
                            value={editedFields.phone}
                            onChange={(e) => handleEditChange('phone', e.target.value)}
                          />
                        ) : (
                          user.phone ? user.phone : 'N/A'
                        )}
                      </td>
                      <td data-table="Estado">
                        {user.isActive ? "Activo" : "Inactivo"}
                      </td>
                      <td>
                        <button
                          className="btn-edit btn-new-client"
                          onClick={() => editingUser === user._id ? handleSaveEdit() : handleEditClick(user)}
                        >
                          {editingUser === user._id ? 'Guardar' : 'Editar'}
                        </button>
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
                    <td colSpan="7" style={{ textAlign: "center" }}>
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
