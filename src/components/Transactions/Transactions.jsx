import "./Transactions.css";
import { useEffect } from "react";
import { getTransactions, deleteTransaction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import imgPencil from "./../../assets/pencil.svg";
import Swal from "sweetalert2";

const Transactions = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions);
  const userRol = useSelector((state) => state.userRole);
  console.log(transactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  /* Handles */
  const handleDeleteTransaction = (transactionId) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar esta transaccion?",
      icon: "warning",
      showCancelButton: true, // Muestra el botón de cancelar
      confirmButtonText: "Eliminar", // Texto del botón de confirmación
      cancelButtonText: "Cancelar", // Texto del botón de cancelación
      reverseButtons: true, // Opcional: intercambia el orden de los botones
      customClass: {
        confirmButton: "my-confirm-button", // Clase personalizada para el botón de confirmación
        cancelButton: "my-cancel-button", // Clase personalizada para el botón de cancelación
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, ejecutamos la acción deleteUser
        dispatch(deleteTransaction(transactionId));
      }
    });
  };

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
                  <th>Moneda de pago</th>
                  <th>Moneda de compra</th>
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
                      <td data-table="Monto">{transaction.targetAmount}</td>
                      <td data-table="Moneda de pago">
                        {transaction.sourceCurrencyCode}
                      </td>
                      <td data-table="Moneda de compra">
                        {transaction.targetCurrencyCode}
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
                      {userRol === 'administrador' ? (
                      <td data-table="Estado">
                        <button
                          className="btn-trash"
                          onClick={() =>
                            handleDeleteTransaction(transaction._id)
                          }
                        >
                          Eliminar
                        </button>
                      </td>
                      ) : ''}
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
