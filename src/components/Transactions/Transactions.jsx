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
      <div>
        <button className="btn-create-user">
          Registrar transacción
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
      <div className="container-second-section-transactions">
        <div></div>
        <div className="container-table">
          <div className="tbl-container">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Usuario</th>
                  <th>Monto</th>
                  <th>Paga</th>
                  <th>Compra</th>
                  <th>T/C</th>
                  <th>Comisión</th>
                  <th>Fecha</th>
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
                      <td data-table="Usuario">
                        <span>{transaction.userName}</span>
                      </td>
                      <td data-table="Monto">
                        <span>{transaction.targetAmount}</span>
                      </td>
                      <td data-table="Pago">
                        <span>{transaction.sourceCurrencyCode}</span>
                      </td>
                      <td data-table="Compro">
                        <span>{transaction.targetCurrencyCode}</span>
                      </td>
                      <td data-table="T/C">
                        <span>{transaction.exchangeRate}</span>
                      </td>
                      <td data-table="Comisión">
                        <span>
                          {transaction.commission
                            ? transaction.commission
                            : "N/A"}
                        </span>
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
                              hour12: false, // Para formato 24 horas
                            })
                            .replace(",", "")}
                        </span>
                      </td>
                      <td data-table="Sucursal">
                        <span>{transaction.subOfficeName}</span>
                      </td>
                      {userRol === "administrador" ? (
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
                      ) : (
                        ""
                      )}
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
