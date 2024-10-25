import "./Income.css";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../utils/theme";

const incomesArray = [
  {
    _id: 1,
    tipo: "Venta de productos",
    usuario: "Juan",
    descripcion: "Ingreso por la venta de productos electrónicos",
    monto: 25000.0,
    fecha: "2024-10-14T14:30:00",
    sucursal: "Sucursal Central",
  },
  {
    id: 2,
    tipo: "Pago de clientes",
    usuario: "María",
    descripcion: "Cobro de facturas pendientes de clientes",
    monto: 8200.5,
    fecha: "2024-10-14T09:15:00",
    sucursal: "Sucursal Norte",
  },
  {
    id: 3,
    tipo: "Inversión externa",
    usuario: "Carlos",
    descripcion: "Ingreso por inversión de un socio capitalista",
    monto: 15000.0,
    fecha: "2024-10-13T16:45:00",
    sucursal: "Sucursal Sur",
  },
  {
    id: 4,
    tipo: "Renta de propiedad",
    usuario: "Ana",
    descripcion: "Ingreso por alquiler de espacio comercial",
    monto: 6000.0,
    fecha: "2024-10-12T12:00:00",
    sucursal: "Sucursal Central",
  },
  {
    id: 5,
    tipo: "Servicio de consultoría",
    usuario: "Luis",
    descripcion: "Pago por servicios de consultoría empresarial",
    monto: 4500.25,
    fecha: "2024-10-11T08:00:00",
    sucursal: "Sucursal Este",
  },
  {
    id: 6,
    tipo: "Venta de software",
    usuario: "Sofía",
    descripcion: "Ingreso por la venta de licencias de software",
    monto: 5800.0,
    fecha: "2024-10-10T10:30:00",
    sucursal: "Sucursal Oeste",
  },
  {
    id: 7,
    tipo: "Devolución de impuestos",
    usuario: "Pedro",
    descripcion: "Ingreso por devolución de impuestos",
    monto: 4000.0,
    fecha: "2024-10-09T11:15:00",
    sucursal: "Sucursal Central",
  },
];

const Income = () => {
  const [type, setType] = useState("");
  const [selectType, setSelectType] = useState("");
  const [viewForm, setViewForm] = useState(false);

  const [dataForm, setDataForm] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });

  const handleChangeType = (event) => {
    setSelectType(event.target.value);
  };
  const changeForm = () => {
    if (viewForm === false) setViewForm(true);
    else {
      setViewForm(false);
    }
  };

  // Calcular el total de los montos
  const total = incomesArray.reduce((acc, income) => acc + income.monto, 0);

  return (
    <ThemeProvider theme={theme}>
      <section className="section-expense">
        <div>
          <button className="btn-create-user" onClick={changeForm}>
            Registrar ingreso
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
        {viewForm && (
  <form action="" className="form-dashboard">
    <div className="form-columns">
      {/* Primera columna con los inputs apilados */}
      <div className="inputs-column">
        <div className="input-box-dashboard">
          <input
            type="text"
            className="input-field-dashboard"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <label className="label-input-dashboard">Tipo de ingreso</label>
        </div>

        <div className="input-box-dashboard">
          <input
            type="text"
            className="input-field-dashboard"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <label className="label-input-dashboard">Monto</label>
        </div>
      </div>

      {/* Segunda columna con el textarea */}
      <div className="form-column">
        <div className="textarea-box-dashboard">
          <textarea
            className="textarea-field-dashboard"
            name="type"
            value={type}
            placeholder=" "
            onChange={(e) => setType(e.target.value)}
          ></textarea>
          <label className="label-textarea-dashboard">
            Descripcion del ingreso
          </label>
        </div>
      </div>
    </div>

    <div className="buttons-container">
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
      <button className="btn-search-users">
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
)}

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
                  Buscar ingreso por tipo
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
                  {incomesArray && incomesArray.length > 0 ? (
                    incomesArray.map((income) => (
                      <tr key={income._id}>
                        <td data-table="Tipo">
                          <span>{income.tipo}</span>
                        </td>
                        <td data-table="Usuario">
                          <span>{income.usuario}</span>
                        </td>
                        <td data-table="Descripción">
                          <span>{income.descripcion}</span>
                        </td>
                        <td data-table="Monto">
                          <span>$ {income.monto.toFixed(2)}</span>
                        </td>
                        <td data-table="Fecha">
                          <span>
                            {new Date(income.fecha)
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
                          <span>{income.sucursal}</span>
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

export default Income;
