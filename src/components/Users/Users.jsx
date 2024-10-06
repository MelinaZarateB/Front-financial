import "./Users.css";
import { useState, useEffect } from "react";
import createUser from "../CreateUser/CreateUser";
import { searchUserByEmail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import imgPencil from './../../assets/pencil.svg';
import imgBlock from './../../assets/block.svg';
import imgLupa from "./../../assets/search_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

const Users = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  console.log(users);

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
  return (
    <section className="container-users">
      <div>
        <div>
          <button className="btn-create-user">Crear usuario</button>
        </div>
        <div className="container-search-purchase">
          <label htmlFor="email">Buscar usuario por email</label>
          <div
            style={{ display: "flex", alignItems: "center" }}
            onChange={handleChange}
            value={email}
          >
            <input
              type="text"
              className="input-search-user"
              name="email"
              onKeyDown={handleKeyDown}
            />
            <img src={imgLupa} alt="" className="lupa" />
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
                    <th colSpan='2'></th>
                  </tr>
                  </thead>
                  <tbody>
                    {users && users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user._id}>
                          <td data-table='Nombre'>{user.username}</td>
                          <td data-table='Apellido'>{user.lastname}</td>
                          <td data-table='Email'>{user.email}</td>
                          <td data-table='Estado'>{user.isActive ? "Activo" : "Inactivo"}</td>
                          <td><button className="btn-edit">Editar</button></td>
                          <td><button className="btn-trash">Desactivar</button></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No hay usuarios disponibles</td>
                      </tr>
                    )}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Users;
