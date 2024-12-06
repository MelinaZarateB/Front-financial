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
} from "@/redux/actions/movementsActions";

const Movements = () => {
  const [type, setType] = useState("");
  const [selectType, setSelectType] = useState("");
  const userRol = useSelector((state) => state.auth.userRole);
  const movements = useSelector((state) => state.movements.movements);
  const deleteMovement = useSelector((state) => state.movements.deleteMovement);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovements());
  }, [dispatch, deleteMovement]);

  const [dataForm, setDataForm] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });

  const getTypeIcon = (category) => {
    switch (category) {
      case "ingreso":
        return (
          <img
            src={imgIncome}
            alt="Ingreso"
            title="Ingreso"
            style={{ margin: "0 auto" }}
          />
        );
      case "egreso":
        return (
          <img
            src={imgExpense}
            alt="Egreso"
            title="Egreso"
            style={{ margin: "0 auto" }}
          />
        );
      default:
        return (
          <img
            src={imgArrows}
            alt={type}
            title={type}
            style={{ margin: "0 auto" }}
          />
        );
    }
  };
  /* Handlers */
  const handleDeleteMovements = (movementId) => {
    dispatch(deleteMovement(movementId));
  };

  return (
    <ThemeProvider theme={theme}>
      <section className="container-movements">
        <div className="container-second-section-movements">
          <div>
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
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <label className="label-input-dashboard">
                  Buscar movimiento
                </label>
              </div>
              <div>
                <DatePicker
                  label="Filtre desde"
                  value={dataForm.dateFrom}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) =>
                    setDataForm({ ...dataForm, dateFrom: newValue })
                  }
                />
              </div>
              <div>
                <DatePicker
                  label="Hasta"
                  value={dataForm.dateTo}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) =>
                    setDataForm({ ...dataForm, dateTo: newValue })
                  }
                />
              </div>
              <button className="btn-search-users">
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
              <button className="btn-clean">
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
          </div>
          <div className="container-table">
            <div className="tbl-container">
              <table className="tbl-cash">
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th>Usuario</th>
                    <th>Monto</th>
                    <th>Descripción</th>
                    <th>Moneda</th>
                    <th>Fecha</th>
                    <th>Sucursal</th>
                    {userRol === "administrador" ? (
                      <th colSpan="1"></th>
                    ) : (
                      ""
                    )}
                  </tr>
                </thead>
                <tbody>
                  {movements && movements.length > 0 ? (
                    movements.map((movement) => (
                      <tr key={movement._id}>
                        <td data-table="Categoría">
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {movement.category} {getTypeIcon(movement.category)}
                          </span>
                        </td>
                        <td data-table="Usuario">{movement.user.username}</td>
                        <td data-table="Monto">
                          <span>$ {movement.amount}</span>
                        </td>
                        <td data-table="Descripción">
                          <span>{movement.description}</span>
                        </td>

                        <td data-table="Moneda">
                          <span>{movement.currency.name} - {movement.currency.code}</span>
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
                        {userRol === "administrador" ? (
                          <td data-table="Estado">
                            <button
                              className="btn-trash"
                              onClick={() =>
                                handleDeleteMovements(movement._id)
                              }
                            >
                              Eliminar
                            </button>
                          </td>
                        ) : (
                          ""
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
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
