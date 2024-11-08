import "./ClientTransactions.css";

const transacciones = [
  {
    tipo: "Pago",
    monto: 1500.0,
    descripcion: "Pago total de deuda correspondiente al mes de octubre.",
    usuario: "Pedro Martínez",
    createdAt: "2024-11-05T14:00:00",
  },
  {
    tipo: "Deuda",
    monto: 750.0,
    descripcion:
      "Deuda pendiente por servicios no pagados en el mes de septiembre.",
    usuario: "Laura Gómez",
    createdAt: "2024-11-06T09:30:00",
  },
  {
    tipo: "Retiro de saldo en guarda",
    monto: 1200.0,
    descripcion: "Retiro parcial de saldo en guarda por cambio de cheque.",
    usuario: "Juan Pérez",
    createdAt: "2024-11-06T11:15:00",
  },
  {
    tipo: "Saldo en guarda",
    monto: 5000.0,
    descripcion: "Ingreso de saldo en guarda por depósito de cheque.",
    usuario: "Carla Ruiz",
    createdAt: "2024-11-07T09:00:00",
  },
];

const ClientTransactions = () => {
  return (
    <section>
      <div className="container-table">
        <div className="tbl-container">
          <table className="tbl">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Descripción</th>
                <th>Usuario</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.map((transaccion, index) => (
                <tr key={index}>
                  <td>{transaccion.tipo}</td>
                  <td>{transaccion.monto.toFixed(2)}</td>
                  <td>{transaccion.descripcion}</td>
                  <td>{transaccion.usuario}</td>
                  <td>
                    {" "}
                    {new Date(transaccion.createdAt)
                      .toLocaleString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, // Para formato 24 horas
                      })
                      .replace(",", "")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ClientTransactions;
