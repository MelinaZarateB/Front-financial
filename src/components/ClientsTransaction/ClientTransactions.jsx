import "./ClientTransactions.css";

const ClientTransactions = ({ transactions, id }) => {
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
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id || id}>
                    <td>{transaction.type || "N/A"}</td>
                    <td>{transaction.amount?.toFixed(2) || "N/A"}</td>
                    <td>{transaction.description || "N/A"}</td>
                    <td>{transaction.user || "N/A"}</td>
                    <td>
                      {transaction.createdAt
                        ? new Date(transaction.createdAt)
                            .toLocaleString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false, // Para formato 24 horas
                            })
                            .replace(",", "")
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No hay transacciones disponibles para este cliente
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ClientTransactions;
