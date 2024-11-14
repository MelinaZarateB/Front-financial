import "./CashRegisterClose.css";
import imgArrows from "./../../assets/arrows.svg";
import imgIncome from "./../../assets/arrowIncome.svg";
import imgExpense from "./../../assets/arrowExpense.svg";
import { useState } from "react";


const movimientos = [
  {
    _id: 1,
    type: "venta",
    targetAmount: 1500,
    createdAt: "2024-10-01T10:30:00",
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
    createdAt: "2024-10-02T12:45:00",
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
    createdAt: "2024-10-03T09:15:00",
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
    createdAt: "2024-10-04T16:20:00",
    userName: "Juan Pérez",
    subOfficeName: "Sucursal Centro",
  },
  {
    _id: 5,
    type: "egreso",
    description: "Pago de alquiler de oficina",
    targetAmount: -800,
    createdAt: "2024-10-05T14:50:00",
    userName: "María García",
    subOfficeName: "Sucursal Norte",
  },
  {
    _id: 6,
    type: "egreso",
    description: "Pago de facturas de servicios",
    targetAmount: -300,
    createdAt: "2024-10-06T11:30:00",
    userName: "Carlos Sánchez",
    subOfficeName: "Sucursal Oeste",
  },
  {
    _id: 7,
    type: "ingreso",
    description: "Depósito de intereses de inversión",
    targetAmount: 400,
    createdAt: "2024-10-07T13:15:00",
    userName: "Juan Pérez",
    subOfficeName: "Sucursal Centro",
  },
  {
    _id: 8,
    type: "compra",
    targetAmount: -1000,
    createdAt: "2024-10-08T09:00:00",
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
    createdAt: "2024-10-09T15:30:00",
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
    createdAt: "2024-10-10T17:10:00",
    userName: "Juan Pérez",
    subOfficeName: "Sucursal Centro",
  },
  {
    _id: 11,
    type: "egreso",
    description: "Pago a proveedores",
    targetAmount: -600,
    createdAt: "2024-10-11T08:40:00",
    userName: "María García",
    subOfficeName: "Sucursal Norte",
  },
  {
    _id: 12,
    type: "cambio de cheque",
    targetAmount: 700,
    createdAt: "2024-10-12T10:50:00",
    userName: "Carlos Sánchez",
    sourceCurrencyCode: "USD",
    targetCurrencyCode: "ARS",
    exchangeRate: 350.0,
    commission: 30,
    subOfficeName: "Sucursal Oeste",
  },
];

const CashRegisterClose = () => {
  const [closeRegister, setCloseRegister] = useState(false);
  const [closingTime, setClosingTime] = useState(null);
  const handleCloseRegister = () => {
    // Cuando se cierra la caja, guarda la hora actual
    const now = new Date();
    const formattedTime = now.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Para formato 12h con AM/PM
    });
    setClosingTime(formattedTime);
    setCloseRegister(true);
  };

  return (
    <section className="container-cash-closing">
      <div className="first-section-cash-close">
        <div className="container-btn-cash-close">
          <button
            className="btn-close-cash"
            disabled={closeRegister}
            onClick={handleCloseRegister}
          >
            Cerrar caja
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <h3>Saldo inicial en USD: </h3>
          <span
            style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "0.4rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            $ 4.000,00
          </span>
        </div>
      </div>
      <div className="container-balance">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="span-balance">Balance final en USD: </span>
          <span className="span-monto-balance">$ 5.500,00</span>
        </div>
        <div className="difference-balance">Diferencia: $ 1.500,00</div>
      </div>

      {closeRegister ? (
        <div className="section-cash-closing">
          <div>Caja cerrada exitosamente el {closingTime}</div>
        </div>
      ) : (
        ""
      )}
      <div>
        <div style={{ backgroundColor: "white", padding: "15px" }}>
          <h3 style={{ fontWeight: "500" }}>Operaciones del día</h3>
        </div>

        <div className="container-table">
          <div className="tbl-container-cash-close">
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
                  <th>Hora</th>
                  <th>Sucursal</th>
                  {!closeRegister ? <th colSpan="1"></th> : ""}
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
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "0 auto",
                            }}
                          /> // Para compra, venta, y cambio de cheque
                        ) : movimiento.type === "ingreso" ? (
                          <img
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "0 auto",
                            }}
                            src={imgIncome}
                            alt="Ingreso"
                            title="Ingreso"
                          /> // Emoji o icono para ingreso con tooltip
                        ) : movimiento.type === "egreso" ? (
                          <img
                            src={imgExpense}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "0 auto",
                            }}
                            alt="Egreso"
                            title="Egreso"
                          /> // Emoji o icono para egreso con tooltip
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
                        <span style={{ whiteSpace: "wrap" }}>
                          {movimiento.description}
                        </span>
                      </td>
                      <td data-table="Hora">
                        <span>
                          {new Date(movimiento.createdAt).toLocaleString(
                            "es-ES",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }
                          )}
                        </span>
                      </td>

                      <td data-table="Sucursal">
                        <span>{movimiento.subOfficeName}</span>
                      </td>

                      {!closeRegister ? (
                        <td>
                          <button className="btn-trash">Eliminar</button>{" "}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      No hay operaciones del día
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CashRegisterClose;
