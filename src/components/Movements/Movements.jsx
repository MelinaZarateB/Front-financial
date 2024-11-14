import "./Movements.css";
import { useState } from "react";
import imgArrows from "./../../assets/arrows.svg";
import imgExpense from "./../../assets/arrowExpense.svg";
import imgIncome from "./../../assets/arrowIncome.svg";

import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../utils/theme";
import imgPencil from "./../../assets/pencil.svg";

const movimientos = [
  {
    _id: 1,
    type: "venta",
    targetAmount: 1500,
    createdAt: "2024-10-01",
    userName: "Juan Pérez",
    sourceCurrencyCode: "USD",
    targetCurrencyCode: "ARS",
    exchangeRate: 350.5,
    commission: 50,
    subOfficeName: "Sucursal Centro",
  },
  {
    _id: 2,
    type: "compra",
    targetAmount: -1200,
    createdAt: "2024-10-02",
    userName: "María García",
    sourceCurrencyCode: "ARS",
    targetCurrencyCode: "USD",
    exchangeRate: 348.7,
    commission: 35,
    subOfficeName: "Sucursal Norte",
  },
  {
    _id: 3,
    type: "cambio de cheque",
    targetAmount: 500,
    createdAt: "2024-10-03",
    userName: "Carlos Sánchez",
    sourceCurrencyCode: "USD",
    targetCurrencyCode: "ARS",
    exchangeRate: 351.2,
    commission: 20,
    subOfficeName: "Sucursal Oeste",
  },
  {
    _id: 4,
    type: "ingreso",
    description: "Pago de cliente por servicios prestados",
    targetAmount: 2000,
    createdAt: "2024-10-04",
    userName: "Juan Pérez",
    subOfficeName: "Sucursal Centro",
  },
  {
    _id: 5,
    type: "egreso",
    description: "Pago de alquiler de oficina",
    targetAmount: -800,
    createdAt: "2024-10-05",
    userName: "María García",
    subOfficeName: "Sucursal Norte",
  },
  {
    _id: 6,
    type: "egreso",
    description: "Pago de facturas de servicios",
    targetAmount: -300,
    createdAt: "2024-10-06",
    userName: "Carlos Sánchez",
    subOfficeName: "Sucursal Oeste",
  },
  {
    _id: 7,
    type: "ingreso",
    description: "Depósito de intereses de inversión",
    targetAmount: 400,
    createdAt: "2024-10-07",
    userName: "Juan Pérez",
    subOfficeName: "Sucursal Centro",
  },
  {
    _id: 8,
    type: "compra",
    targetAmount: -1000,
    createdAt: "2024-10-08",
    userName: "María García",
    sourceCurrencyCode: "USD",
    targetCurrencyCode: "ARS",
    exchangeRate: 349.9,
    commission: 40,
    subOfficeName: "Sucursal Norte",
  },
  {
    _id: 9,
    type: "venta",
    targetAmount: 2500,
    createdAt: "2024-10-09",
    userName: "Carlos Sánchez",
    sourceCurrencyCode: "ARS",
    targetCurrencyCode: "USD",
    exchangeRate: 352.1,
    commission: 75,
    subOfficeName: "Sucursal Oeste",
  },
  {
    _id: 10,
    type: "ingreso",
    description: "Pago por consultoría",
    targetAmount: 1800,
    createdAt: "2024-10-10",
    userName: "Juan Pérez",
    subOfficeName: "Sucursal Centro",
  },
  {
    _id: 11,
    type: "egreso",
    description: "Pago a proveedores",
    targetAmount: -600,
    createdAt: "2024-10-11",
    userName: "María García",
    subOfficeName: "Sucursal Norte",
  },
  {
    _id: 12,
    type: "cambio de cheque",
    targetAmount: 700,
    createdAt: "2024-10-12",
    userName: "Carlos Sánchez",
    sourceCurrencyCode: "USD",
    targetCurrencyCode: "ARS",
    exchangeRate: 350.0,
    commission: 30,
    subOfficeName: "Sucursal Oeste",
  },
];

const Movements = () => {
  const [type, setType] = useState("");
  const [selectType, setSelectType] = useState("");

  const [dataForm, setDataForm] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });

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
                  onChange={(newValue) => {
                    setDataForm({ ...dataForm, dateFrom: newValue });
                  }}
                />
              </div>
              <div>
                <DatePicker
                  label="Hasta"
                  value={dataForm.dateTo}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    setDataForm({ ...dataForm, dateTo: newValue });
                  }}
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
                    <th>Tipo</th>
                    <th>Usuario</th>
                    <th>Monto</th>
                    <th>Paga</th>
                    <th>Compra</th>
                    <th>T/C</th>
                    <th>Descripcion</th>
                    <th>Fecha</th>
                    <th>Sucursal</th>
                    <th colSpan="1"></th>
                  </tr>
                </thead>
                <tbody>
                  {movimientos && movimientos.length > 0 ? (
                    movimientos.map((movimiento) => (
                      <tr key={movimiento._id}>
                        <td data-table="Tipo">
                          {["compra", "venta", "cambio de cheque"].includes(
                            movimiento.type
                          ) ? (
                            <img
                            src={imgArrows}
                            alt=""
                            title={movimiento.type}
                            style={{display: 'flex', justifyContent: 'center', margin: '0 auto'}}
                            /> // Para compra, venta, y cambio de cheque
                          ) : movimiento.type === "ingreso" ? (
                            <img
                            style={{display: 'flex', justifyContent: 'center', margin: '0 auto'}}
                              src={imgIncome}
                              alt="Ingreso"
                              title="Ingreso"
                            /> // Emoji o icono para ingreso con tooltip
                          ) : movimiento.type === "egreso" ? (
                            <img src={imgExpense}  style={{display: 'flex', justifyContent: 'center', margin: '0 auto'}} alt="Egreso" title="Egreso" /> // Emoji o icono para egreso con tooltip
                          ) : (
                            ""
                          )}
                        </td>
                   
                        <td data-table="Usuario">
                          <span>{movimiento.userName}</span>
                        </td>
                        <td data-table="Monto">
                          <span>$ {movimiento.targetAmount}</span>
                        </td>
                        <td data-table="Paga">
                          <span>{movimiento.sourceCurrencyCode}</span>
                        </td>
                        <td data-table="Compra">
                          <span>{movimiento.targetCurrencyCode}</span>
                        </td>
                        <td data-table="T/C">
                          <span>{movimiento.exchangeRate}</span>
                        </td>
                        <td data-table="Descripcion">
                            <span style={{whiteSpace:'wrap'}}>{movimiento.description}</span>
                        </td>
                        <td data-table="Fecha">
                          <span>
                            {new Date(movimiento.createdAt)
                              .toLocaleString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false, // Para formato 24 horas
                              })
                              .replace(",", "")}
                          </span>
                        </td>
                        <td data-table="Sucursal">
                          <span>{movimiento.subOfficeName}</span>
                        </td>
                        <td >
                          <button className="btn-trash">Eliminar</button>
                        </td>
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
