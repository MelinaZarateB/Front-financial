import "./Transactions.css";
import { useEffect, useState } from "react";
import {
  getTransactions,
  deleteTransaction,
} from "../../redux/actions/transactionsActions";
import { useDispatch, useSelector } from "react-redux";
import imgPencil from "./../../assets/pencil.svg";
import Swal from "sweetalert2";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { Switch } from "@/components/ui/switch";
import theme from "../../utils/theme";
import plusIcon from "./../../assets/plus.svg";
import ModalNewClient from "@/visuals/Modals/ModalNewClient/ModalNewClient";
import { createTransactions } from "../../redux/actions/transactionsActions";
import {
  getSubOffices,
  getCurrencies,
} from "@/redux/actions/subOfficesActions";

const clients = [
  {
    _id: 1,
    firstName: "Juan",
    lastName: "Pérez",
  },
  {
    _id: 2,
    firstName: "Ana",
    lastName: "González",
  },
  {
    _id: 3,
    firstName: "Carlos",
    lastName: "Martínez",
  },
];
const Transactions = () => {
    // Redux hooks
    const dispatch = useDispatch();
    const subOffices = useSelector((state) => state.offices.subOffices);
    const transactions = useSelector((state) => state.transactions.transactions);
    const userRol = useSelector((state) => state.auth.userRole);
  
    // Local state
    const [viewForm, setViewForm] = useState(false);
    const [hasGuardedBalance, setHasGuardedBalance] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [subOfficeCurrencies, setSubOfficeCurrencies] = useState([]);
    const [clientSelected, setClientSelected] = useState({ id: "", firstName: "" });
    const [dataForm, setDataForm] = useState({ dateFrom: new Date(), dateTo: new Date() });
    const [newTransaction, setNewTransaction] = useState({
      type: "",
      amount: "",
      sourceCurrencyCode: "",
      targetCurrencyCode: "",
      exchangeRate: "",
      commission: "",
      subOffice: "",
    });
  
    // Constants
    const typesTransactions = [
      { value: "check", label: "Cambio de cheque" },
      { value: "buy", label: "Compra" },
      { value: "sell", label: "Venta" },
    ];
  
    // Effects
    useEffect(() => {
      dispatch(getTransactions());
      dispatch(getSubOffices());
    }, [dispatch]);
  
    // Event handlers
    const handleSelectChange = (e) => {
      const { name, value } = e.target;
      setNewTransaction({ ...newTransaction, [name]: value });
  
      if (name === "subOffice") {
        if (value === "") {
          setSubOfficeCurrencies([]);
        } else {
          const selectedOffice = subOffices.find((office) => office.name === value);
          if (selectedOffice) {
            setSubOfficeCurrencies(selectedOffice.currencies.map((c) => c.currency));
          }
        }
      }
    };
  
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
  
    const handleDeleteTransaction = (transactionId) => {
      Swal.fire({
        title: "¿Seguro que desea eliminar esta transaccion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        customClass: {
          confirmButton: "my-confirm-button",
          cancelButton: "my-cancel-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteTransaction(transactionId));
        }
      });
    };
  
    const changeForm = () => setViewForm(!viewForm);
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
              style={{
                transform: viewForm ? "rotate(-90deg)" : "",
                transition: "all 0.2s ease-in-out",
              }}
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
                    <div
                      className={`select-container ${
                        newTransaction.subOffice ? "has-value" : ""
                      }`}
                    >
                      <select
                        name="subOffice" // Este name debe coincidir con la propiedad en newTransaction
                        className="input-field-dashboard select"
                        style={{
                          color: newTransaction.subOffice ? "#000" : "#555",
                          cursor: "pointer",
                        }}
                        value={newTransaction.subOffice} // Asegura que esté sincronizado
                        onChange={handleSelectChange}
                      >
                        <option value="">Sucursal</option>
                        {subOffices.map((office) => (
                          <option key={office._id} value={office.name}>
                            {office.name}
                          </option>
                        ))}
                      </select>
                      <div
                        className="floating-label"
                        style={{ backgroundColor: "rgba(255, 255, 255)" }}
                      >
                        Sucursal
                      </div>
                    </div>
                  </div>
                  <div className="input-box-dashboard">
                    <div
                      className={`select-container ${
                        newTransaction.type ? "has-value" : ""
                      }`}
                    >
                      <select
                        name="type"
                        className="input-field-dashboard select"
                        style={{
                          color: newTransaction.type ? "#000" : "#555",
                          cursor: "pointer",
                        }}
                        value={newTransaction.type}
                        onChange={handleSelectChange}
                      >
                        <option value="">Tipo de transacción</option>
                        {typesTransactions.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <div
                        className="floating-label"
                        style={{ backgroundColor: "rgba(255, 255, 255)" }}
                      >
                        Transacción
                      </div>
                    </div>
                  </div>

                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="amount"
                      value={newTransaction.amount}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Monto
                    </label>
                  </div>

                  <div className="input-box-dashboard">
                    <div
                      className={`select-container ${
                        newTransaction.sourceCurrencyCode ? "has-value" : ""
                      }`}
                    >
                      <select
                        name="sourceCurrencyCode" // Este name debe coincidir con la propiedad en newTransaction
                        className="input-field-dashboard select"
                        style={{
                          color: newTransaction.sourceCurrencyCode
                            ? "#000"
                            : "#555",
                          cursor: "pointer",
                        }}
                        value={newTransaction.sourceCurrencyCode} // Asegura que esté sincronizado
                        onChange={handleSelectChange}
                      >
                        <option value="">Paga</option>
                        {subOfficeCurrencies.map((currency) => (
                          <option key={currency._id} value={currency.name}>
                            {currency.name} - {currency.code}
                          </option>
                        ))}
                      </select>
                      <div
                        className="floating-label"
                        style={{ backgroundColor: "rgba(255, 255, 255)" }}
                      >
                        Paga
                      </div>
                    </div>
                  </div>

                  <div className="input-box-dashboard">
                    <div
                      className={`select-container ${
                        newTransaction.targetCurrencyCode ? "has-value" : ""
                      }`}
                    >
                      <select
                        name="targetCurrencyCode" // Este name debe coincidir con la propiedad en newTransaction
                        className="input-field-dashboard select"
                        style={{
                          color: newTransaction.targetCurrencyCode
                            ? "#000"
                            : "#555",
                          cursor: "pointer",
                        }}
                        value={newTransaction.targetCurrencyCode} // Asegura que esté sincronizado
                        onChange={handleSelectChange}
                      >
                        <option value="">Compra</option>
                        {subOfficeCurrencies.map((currency) => (
                          <option key={currency._id} value={currency.name}>
                            {currency.name} - {currency.code}
                          </option>
                        ))}
                      </select>
                      <div
                        className="floating-label"
                        style={{ backgroundColor: "rgba(255, 255, 255)" }}
                      >
                        Compra
                      </div>
                    </div>
                  </div>

                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="exchangeRate"
                      value={newTransaction.exchangeRate}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Tasa de cambio
                    </label>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "5px",
                }}
              >
                <Switch
                  id="guarded-balance"
                  checked={hasGuardedBalance}
                  onCheckedChange={setHasGuardedBalance}
                />
                <label htmlFor="">Registrar Saldo en Guarda</label>
              </div>

              {hasGuardedBalance && (
                <div className="space-y-4 border-t pt-4">
                  <div className="container-input-btn">
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
                        Buscar cliente por nombre
                      </label>
                    </div>
                    <div>
                      <button
                        className="btn-new-client"
                        onClick={handleOpenModal}
                      >
                        <span>Nuevo cliente</span>
                        <img src={plusIcon} alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="container-client-first-section">
                    {clients?.map((client) => (
                      <div
                        key={client._id}
                        className="container-client-saldo"
                        onClick={() =>
                          setClientSelected({
                            id: client._id,
                            firstName: `${client.firstName} ${client.lastName}`,
                          })
                        }
                        style={{
                          backgroundColor:
                            clientSelected.id === client._id ? "#EFF6FF" : "",
                          border:
                            clientSelected.id === client._id
                              ? "1px solid #1F97F3"
                              : "",
                        }}
                      >
                        <span>{client.firstName}</span>{" "}
                        <span>{client.lastName}</span>
                      </div>
                    ))}
                  </div>
                  {clientSelected.firstName && (
                    <div>
                      <div className="input-box-dashboard">
                        <input type="text" className="input-field-dashboard" />
                        <label
                          className="label-input-dashboard"
                          style={{ backgroundColor: "rgba(255, 255, 255)" }}
                        >
                          Ingrese monto en guarda
                        </label>
                      </div>
                      <p
                        style={{
                          color: "rgb(107 114 128)",
                          fontSize: "14px",
                          marginTop: "5px",
                        }}
                      >
                        Este monto quedará registrado como saldo en guarda para{" "}
                        {clientSelected.firstName}
                      </p>
                    </div>
                  )}
                </div>
              )}
              <ModalNewClient isOpen={isModalOpen} onClose={handleCloseModal} />
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
