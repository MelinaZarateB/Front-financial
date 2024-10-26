import "./Transactions.css";
import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import imgPencil from "./../../assets/pencil.svg";
import Swal from "sweetalert2";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../utils/theme";

const Transactions = () => {
  const dispatch = useDispatch();
  const [viewForm, setViewForm] = useState(false);
  const [selectType, setSelectType] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    type: "",
    amount: "",
    sourceCurrencyCode: "",
    targetCurrencyCode: "",
    exchangeRate: "",
    commission: "",
    office: "",
  });

  const transactions = useSelector((state) => state.transactions);
  const userRol = useSelector((state) => state.userRole);
  const [dataForm, setDataForm] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });
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
  const changeForm = () => {
    if (viewForm === false) setViewForm(true);
    else {
      setViewForm(false);
    }
  };
  const handleChangeNewIncome = (event) => {
    setNewTransaction({
      ...newTransaction,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <section className="container-transactions">
        <div>
          <button
            className="btn-create-user"
            onClick={changeForm}
            style={{
              borderBottomLeftRadius: viewForm ? "0px" : "4px",
              borderBottomRightRadius: viewForm ? "0px" : "4px",
            }}
          >
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
          <div className={`form-container ${viewForm ? "open" : ""}`}>
            <form
              action=""
              className="form-dashboard"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-columns">
                {/* Primera columna con los inputs apilados */}
                <div className="inputs-column">
                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="type"
                      value={newTransaction.type}
                      onChange={handleChangeNewIncome}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Tipo de transacción
                    </label>
                  </div>

                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="amount"
                      value={newTransaction.amount}
                      onChange={handleChangeNewIncome}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Monto
                    </label>
                  </div>
                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="sourceCurrencyCode"
                      value={newTransaction.sourceCurrencyCode}
                      onChange={handleChangeNewIncome}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Paga
                    </label>
                  </div>
                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="targetCurrencyCode"
                      value={newTransaction.targetCurrencyCode}
                      onChange={handleChangeNewIncome}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Compra
                    </label>
                  </div>
                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="exchangeRate"
                      value={newTransaction.exchangeRate}
                      onChange={handleChangeNewIncome}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Tasa de cambio
                    </label>
                  </div>
                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="commission"
                      value={newTransaction.commission}
                      onChange={handleChangeNewIncome}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Comisión
                    </label>
                  </div>
                </div>

                {/* Segunda columna con el textarea */}



                <div className="input-box-dashboard">
                  <div
                    className={`select-container ${
                      selectType ? "has-value" : ""
                    }`}
                  >
                    <select
                      name="typeExpense"
                      className="input-field-dashboard select"
                      style={{
                        color: selectType ? "#000" : "#555",
                        cursor: "pointer",
                      }}
                    >
                      <option value="all">Sucursal</option>
                    </select>
                    <div
                      className="floating-label"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Sucursal
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="buttons-container"
                style={{ display: "flex", gap: "5px", justifyContent: "end" }}
              >
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
                <button className="btn-search-users" onClick={changeForm}>
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
          </div>
        </div>
        <div className="container-second-section-transactions">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "3px",
            }}
          >
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
                        <td data-table="Paga">
                          <span>{transaction.sourceCurrencyCode}</span>
                        </td>
                        <td data-table="Compra">
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
    </ThemeProvider>
  );
};

export default Transactions;
