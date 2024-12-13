import "./AdminUsers.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanFilterUserByEmail,
  searchUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  registerUser,
} from "../../redux/actions/userActions";
import Swal from "sweetalert2";
import { useRef, useCallback } from "react";
import SpinnerSmall from "./../../utils/Spinner/SpinnerSmall";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const users = useSelector((state) => state.user.users);
  const userByEmail = useSelector((state) => state.user.userByEmail);
  //const subOffices = useSelector((state) => state.offices.subOffices);
  const [selectType, setSelectType] = useState("");
  const [viewForm, setViewForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const tableRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    lastname: "",
    email: "",
    password: "",
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
    setEditedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    const userToUpdate =
      editingUser === userByEmail._id
        ? userByEmail
        : users.find((u) => u._id === editingUser);
    if (!userToUpdate) return;

    const hasChanges = Object.keys(editedFields).some(
      (key) => editedFields[key] !== userToUpdate[key]
    );

    if (hasChanges) {
      dispatch(updateUser(editingUser, editedFields));
    }

    setEditingUser(null);
    setEditedFields({});
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
            style={{
              transform: viewForm ? "rotate(-90deg)" : "",
              transition: "all 0.2s ease-in-out",
            }}
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
                    value={newUser.lastname}
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
                    name="phone"
                    value={newUser.phone}
                    onChange={handleChangeNewUser}
                  />
                  <label
                    className="label-input-dashboard"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Teléfono
                  </label>
                </div>
                <div className="input-box-dashboard">
                  <input
                    type="text"
                    className="input-field-dashboard"
                    name="email"
                    value={newUser.email}
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
                  <input
                    type="text"
                    className="input-field-dashboard"
                    name="password"
                    value={newUser.password}
                    onChange={handleChangeNewUser}
                  />
                  <label
                    className="label-input-dashboard"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Contraseña
                  </label>
                </div>
                {/*
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
                    onChange={handleChangeNewUser}
                  >
                     <option value="">Sucursal</option>
                        {subOffices.map((office) => (
                          <option key={office._id} value={office.name}>
                            {office.name}
                          </option>
                        ))}
                  </select>
                  <div
                    className="floating-label"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Sucursal
                  </div>
                </div>
              </div>
                
                */}
              </div>
            </div>
            <div
              className="buttons-container"
              style={{ display: "flex", gap: "5px", justifyContent: "end" }}
            >
              <button
                className="btn-search-users"
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
                  {isSubmitting ? <SpinnerSmall /> : "Registrar"}
                </label>

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
                          onChange={(e) =>
                            handleEditChange("username", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleEditChange("lastname", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleEditChange("email", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleEditChange("phone", e.target.value)
                          }
                        />
                      ) : userByEmail.phone ? (
                        userByEmail.phone
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td data-table="Estado">
                      {userByEmail.isActive ? "Activo" : "Inactivo"}
                    </td>
                    <td>
                      <button
                        className="btn-edit btn-new-client"
                        onClick={() =>
                          editingUser === userByEmail._id
                            ? handleSaveEdit()
                            : handleEditClick(userByEmail)
                        }
                      >
                        {editingUser === userByEmail._id ? "Guardar" : "Editar"}
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
                            onChange={(e) =>
                              handleEditChange("username", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleEditChange("lastname", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleEditChange("email", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleEditChange("phone", e.target.value)
                            }
                          />
                        ) : user.phone ? (
                          user.phone
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td data-table="Estado">
                        {user.isActive ? "Activo" : "Inactivo"}
                      </td>
                      <td>
                        <button
                          className="btn-edit btn-new-client"
                          onClick={() =>
                            editingUser === user._id
                              ? handleSaveEdit()
                              : handleEditClick(user)
                          }
                        >
                          {editingUser === user._id ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="14px"
                              viewBox="0 -960 960 960"
                              width="14px"
                              fill="white"
                            >
                              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="13px"
                              viewBox="0 -960 960 960"
                              width="13px"
                              fill="white"
                            >
                              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                            </svg>
                          )}
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn-trash"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="white"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
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
