import "./Movements.css";
import { useState, useEffect } from "react";
import imgArrows from "./../../assets/arrows.svg";
import imgExpense from "./../../assets/arrowExpense.svg";
import imgIncome from "./../../assets/arrowIncome.svg";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../utils/theme";
import imgPencil from "./../../assets/pencil.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteMovement,
  getAllMovements,
  cleanFilter,
  filterMovement
} from "@/redux/actions/movementsActions";

const Movements = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [userRol, setUserRol] = useState("");
  const [selectType, setSelectType] = useState("");
  const movements = useSelector((state) => state.movements.movements);
  const movementsFiltered = useSelector((state) => state.movements.movementsFiltered);
  const deleteMovements = useSelector((state) => state.movements.deleteMovement);

  useEffect(() => {
    dispatch(getAllMovements());
  }, [dispatch, deleteMovements]);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setUserRol(userInfo.role);
    }
  }, []);

  const [dataForm, setDataForm] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });

  const getTypeIcon = (category) => {
    switch (category) {
      case "ingreso":
        return <img src={imgIncome} alt="Ingreso" title="Ingreso" style={{ margin: "0 auto" }} />;
      case "egreso":
        return <img src={imgExpense} alt="Egreso" title="Egreso" style={{ margin: "0 auto" }} />;
      default:
        return <img src={imgArrows} alt={type} title={type} style={{ margin: "0 auto" }} />;
    }
  };

  const handleDeleteMovements = (movementId) => {
    dispatch(deleteMovement(movementId));
  };

  const handleFilterType = () => {
    dispatch(filterMovement(selectType));
  };

  const handleCleanFilter = () => {
    dispatch(cleanFilter());
    setSelectType('');
  };

  return (
    <ThemeProvider theme={theme}>
      <section className="container-movements">
        <div className="container-second-section-movements">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "3px" }}>
              <div className="input-box-dashboard">
                <input
                  type="text"
                  className="input-field-dashboard"
                  name="type"
                  value={selectType}
                  onChange={(e) => setSelectType(e.target.value)}
                />
                <label className="label-input-dashboard">Buscar movimiento</label>
              </div>
              <button className="btn-search-users" onClick={handleFilterType}>
                Buscar{" "}
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#06571f">
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
              </button>
              <button className="btn-clean" onClick={handleCleanFilter}>
                Limpiar{" "}
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#06571f">
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="container-table">
            <div className="tbl-container">
              <table className="tbl-cash">
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th>Tipo</th>
                    <th>Usuario</th>
                    <th>Monto</th>
                    <th>Descripción</th>
                    <th>Moneda</th>
                    <th>Fecha</th>
                    <th>Sucursal</th>
                    {userRol === "administrador" && <th colSpan="1">Acciones</th>}
                  </tr>
                </thead>
                <tbody>
                  {(movementsFiltered.length > 0 ? movementsFiltered : movements).length > 0 ? (
                    (movementsFiltered.length > 0 ? movementsFiltered : movements).map((movement) => (
                      <tr key={movement._id}>
                        <td data-table="Categoría">
                          <span style={{ display: "flex", alignItems: "center" }}>
                            {movement.category} {getTypeIcon(movement.category)}
                          </span>
                        </td>
                        <td>{movement.type}</td>
                        <td data-table="Usuario">{movement.user.username}</td>
                        <td data-table="Monto">
                          <span>$ {movement.amount}</span>
                        </td>
                        <td data-table="Descripción">
                          <span>{movement.description}</span>
                        </td>
                        <td data-table="Moneda">
                          <span>
                            {movement.currency.name} - {movement.currency.code}
                          </span>
                        </td>
                        <td data-table="Fecha">
                          <span>
                            {new Date(movement.date)
                              .toLocaleString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                              .replace(",", "")}
                          </span>
                        </td>
                        <td data-table="Sucursal">
                          <span>{movement.sub_office.name}</span>
                        </td>
                        {userRol === "administrador" && (
                          <td data-table="Estado">
                            <button
                              className="btn-trash"
                              onClick={() => handleDeleteMovements(movement._id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        No hay movimientos disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Movements;