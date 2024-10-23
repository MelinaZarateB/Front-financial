import "./CashRegisterClose.css";
import imgArrows from "./../../assets/arrows.svg";
import imgIncome from "./../../assets/arrowIncome.svg";
import imgExpense from "./../../assets/arrowExpense.svg";

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
  return (
    <section className="container-cash-closing">
        <div className="first-section-cash-close">
        <div className="container-btn-cash-close">
            <button className="btn-close-cash">Cerrar caja</button>
        </div>
        <div>
      <span
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "10px",
          width: "300px",
        }}
      >
        Saldo inicial en USD: 00.0
      </span>
        </div>
        </div>
        <div className="container-balance">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>Balance final en USD: </span>
            <span>$ 0.00</span>
            </div>
            <div>
                Diferencia: $ 0.00
            </div>
        </div>
      <div>
        <div style={{ backgroundColor: "white", padding: "15px" }}>
          <h3 style={{ fontWeight: "500" }}>Operaciones del día</h3>
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
                  <th>Comisión</th>
                  <th>Descripcion</th>
                  <th>Hora</th>
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
                      <td data-table="Comisión">
                        <span>{movimiento.commission}</span>
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
                      <td>
                        <button className="btn-trash">Eliminar</button>
                      </td>
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
