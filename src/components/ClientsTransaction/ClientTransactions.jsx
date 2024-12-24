import "./ClientTransactions.css";

const ClientTransactions = ({ transactions, id }) => {
  console.log("TRANSACCIONES DEL CLIENNTE", transactions);
  return (
    <section>
      <div className="container-table">
        <div className="tbl-container">
          <table className="tbl">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Usuario</th>
                <th>Monto de origen</th>
                <th>Paga</th>
                <th>T/C</th>
                <th>Monto de egreso</th>
                <th>Compra</th>
                <th>Numero de cheque</th>
                <th>Fecha de cheque</th>
                <th>Banco emisor</th>
                <th>Fecha</th>
                <th>Sucursal</th>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id || id}>
                    <td> <span>{transaction.type || "N/A"}</span></td>
                    <td>{transaction.userName || "N/A"}</td>
                    <td data-table="Monto">
                      <span> {transaction.targetAmount || "N/A"}</span>
                    </td>
                    <td data-table="Paga">
                      <span>{transaction.sourceCurrencyCode || "N/A"}</span>
                    </td>
                    <td data-table="T/C">
                      <span>{transaction.exchangeRate || "N/A"}</span>
                    </td>
                    <td data-table="Monto de egreso">
                      {transaction.targetAmount || "N/A"}
                    </td>
                    <td data-table="Compra">
                      <span>{transaction.targetCurrencyCode || "N/A"}</span>
                    </td>
                    <td data-table="Numero de cheque">
                      {transaction.checkNumber || "N/A"}
                    </td>
                    <td data-table="Fecha de cheque">
                      {transaction.checkDueDate || "N/A"}
                    </td>
                    <td data-table="Banco emisor">
                      {transaction.bankName || "N/A"}
                    </td>

                    <td data-table="Fecha">
                      <span>
                        {new Date(transaction.createdAt)
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
                    <td>{transaction.subOfficeName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" style={{ textAlign: "center" }}>
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
