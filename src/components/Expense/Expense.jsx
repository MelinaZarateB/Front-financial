import "./Expense.css";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../utils/theme";

const typeExpenses = [
  "Servicios Públicos",
  "Alquileres",
  "Sueldos y Salarios",
  "Mantenimiento",
  "Materiales e Insumos",
  "Publicidad y Marketing",
  "Transporte",
  "Impuestos y Tasas",
  "Gastos Administrativos",
  "Seguros",
  "Varios",
];

const expensesArray = [
  {
    id: 1,
    tipo: "Pago de haberes",
    usuario: "Juan",
    descripcion: "Pago de salarios del mes de septiembre a empleados",
    monto: 15000.0,
    fecha: "2024-10-14T14:30:00",
    sucursal: "Sucursal Central",
  },
  {
    id: 2,
    tipo: "Compra de insumos",
    usuario: "María",
    descripcion: "Compra de materiales de oficina",
    monto: 3200.5,
    fecha: "2024-10-14T09:15:00",
    sucursal: "Sucursal Norte",
  },
  {
    id: 3,
    tipo: "Pago de servicios",
    usuario: "Carlos",
    descripcion: "Pago de factura de electricidad",
    monto: 850.75,
    fecha: "2024-10-13T16:45:00",
    sucursal: "Sucursal Sur",
  },
  {
    id: 4,
    tipo: "Pago de alquiler",
    usuario: "Ana",
    descripcion: "Pago de alquiler de oficina",
    monto: 5000.0,
    fecha: "2024-10-12T12:00:00",
    sucursal: "Sucursal Central",
  },
  {
    id: 5,
    tipo: "Gastos de viaje",
    usuario: "Luis",
    descripcion: "Reembolso de gastos de viaje para conferencia",
    monto: 2400.25,
    fecha: "2024-10-11T08:00:00",
    sucursal: "Sucursal Este",
  },
  {
    id: 6,
    tipo: "Mantenimiento",
    usuario: "Sofía",
    descripcion: "Pago por mantenimiento del sistema informático",
    monto: 1800.0,
    fecha: "2024-10-10T10:30:00",
    sucursal: "Sucursal Oeste",
  },
  {
    id: 7,
    tipo: "Pago de comisiones",
    usuario: "Pedro",
    descripcion: "Pago de comisiones a vendedores por ventas realizadas",
    monto: 3000.0,
    fecha: "2024-10-09T11:15:00",
    sucursal: "Sucursal Central",
  },
];

const Expense = () => {
  const [type, setType] = useState("");
  const [selectType, setSelectType] = useState("");
  const [viewForm, setViewForm] = useState(false);
  const [dataForm, setDataForm] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });

  const handleChangeType = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "all") {
      setSelectType(""); // Restablecer el valor del select
    } else {
      setSelectType(selectedValue); // Establecer el valor seleccionado
    }
  };

  // Calcular el total de los montos
  const total = expensesArray.reduce((acc, expense) => acc + expense.monto, 0);

  return (
    <ThemeProvider theme={theme}>
      <section className="section-expense">
        <div>
          <button className="btn-create-user">
            Registrar egreso
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
          </button>
        </div>
        <div>
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
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <label className="label-input-dashboard">
                  Buscar egreso por tipo
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
                    value={selectType}
                    onChange={handleChangeType}
                    style={{
                      color: selectType ? "#000" : "#555",
                      cursor: "pointer",
                    }}
                  >
                    <option value="all">Filtre por tipo de egreso</option>
                    {typeExpenses?.map((typeExpense, index) => (
                      <option key={index} value={typeExpense}>
                        {typeExpense}
                      </option>
                    ))}
                  </select>
                  <div className="floating-label">
                    Filtre por tipo de egreso
                  </div>
                </div>
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
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Usuario</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                    <th>Sucursal</th>
                    <th colSpan="1"></th>
                  </tr>
                </thead>
                <tbody>
                  {expensesArray && expensesArray.length > 0 ? (
                    expensesArray.map((expense) => (
                      <tr key={expense.id}>
                        <td data-table="Tipo">
                          <span>{expense.tipo}</span>
                        </td>
                        <td data-table="Usuario">
                          <span>{expense.usuario}</span>
                        </td>
                        <td data-table="Descripción">
                          <span>{expense.descripcion}</span>
                        </td>
                        <td data-table="Monto">
                          <span> $ -{expense.monto.toFixed(2)}</span>
                        </td>
                        <td data-table="Fecha">
                          <span>
                            {new Date(expense.fecha)
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
                          <span>{expense.sucursal}</span>
                        </td>

                        <td>
                          <button className="btn-trash">Eliminar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        No hay egresos disponibles
                      </td>
                    </tr>
                  )}

                  {/* Fila para el total */}
                  <tr>
                    <td colSpan="3" style={{ textAlign: "right" }}>
                      <span style={{ fontWeight: "500" }}>Total:</span>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      <span style={{ fontWeight: "600" }}>
                        $ {total.toFixed(2)}
                      </span>
                    </td>
                    <td colSpan="3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Expense;
