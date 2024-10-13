import "./Transactions.css";
import { useEffect } from "react";
import { getTransactions } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import imgPencil from "./../../assets/pencil.svg";

const Transactions = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions);
  console.log(transactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  return (
    <section className="container-transactions">
      <div className="container-second-section-transactions">
        <div className="container-table">
          <div className="tbl-container">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Moneda</th>
                  <th>Tasa de cambio</th>
                  <th>Comisión</th>
                  <th>Sucursal</th>
                  <th colSpan="1"></th>
                </tr>
              </thead>
              <tbody>
                {transactions && transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td data-table="Tipo">
                        <span
                          data-editable={transaction.type}
                          data-transaction-id={transaction._id}
                          data-field="type"
                        >
                          {transaction.type} <img src={imgPencil} alt="" />
                        </span>
                      </td>
                      <td data-table="Usuario">{transaction.userName}</td>
                      <td data-table="Fecha">
                        {new Date(transaction.createdAt).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          }
                        )}
                      </td>
                      <td data-table="Monto">{transaction.sourceAmount}</td>
                      <td data-table="Moneda">
                        {transaction.sourceCurrencyCode}
                      </td>
                      <td data-table="Tasa de cambio">
                        {transaction.exchangeRate}
                      </td>
                      <td data-table="Comisión">
                        {transaction.commission
                          ? transaction.commission
                          : "N/A"}
                      </td>
                      <td data-table="Sucursal">{transaction.subOfficeName}</td>
                      <td data-table="Estado">
                        <button className="btn-trash">Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      No hay transacciones disponibles
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

export default Transactions;
