import "./Transactions.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactions,
  deleteTransaction,
} from "../../redux/actions/transactionsActions";
import { getClients } from "@/redux/actions/clientsActions";
import Swal from "sweetalert2";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { Switch } from "@/components/ui/switch";
import theme from "../../utils/theme";
import plusIcon from "./../../assets/plus.svg";
import arrow from "./../../assets/arrow-right.svg";
import ModalNewClient from "@/visuals/Modals/ModalNewClient/ModalNewClient";
import {
  createTransactions,
  getTransactionsForDay,
  getTransactionsForMonth,
  getTransactionsRangeDate,
} from "../../redux/actions/transactionsActions";
import { updateMoneyClients } from "@/redux/actions/clientsActions";
import {
  getSubOffices,
  getCurrencies,
} from "@/redux/actions/subOfficesActions";
import SpinnerSmall from "./../../utils/Spinner/SpinnerSmall";
import { useRef, useCallback } from "react";
import DateFilterDropdown from "@/utils/DateFilterDropdown";
import Spinner from "@/utils/Spinner/Spinner";

const Transactions = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const subOffices = useSelector((state) => state.offices.subOffices);
  const transactions = useSelector((state) => state.transactions.transactions);
  const deleteTransactionsSuccess = useSelector(
    (state) => state.transactions.deleteTransactionsSuccess
  );
  const createTransactionsSuccess = useSelector(
    (state) => state.transactions.createTransactionsSuccess
  );
  const [userRol, setUserRol] = useState("");
  const clients = useSelector((state) => state.clients.clients);
  // Local state
  const [viewForm, setViewForm] = useState(false);
  const [hasGuardedBalance, setHasGuardedBalance] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [subOfficeCurrencies, setSubOfficeCurrencies] = useState([]);
  const [clientSelected, setClientSelected] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectSubOffice, setSelectSubOffice] = useState("");
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  const [newTransaction, setNewTransaction] = useState({
    user: "",
    type: "",
    amount: "",
    sourceCurrency: "",
    sourceCurrencyCode: "",
    targetCurrency: "",
    targetCurrencyCode: "",
    exchangeRate: "",
    subOffice: "",
    subOfficeName: "",
    checkNumber: "",
    checkDueDate: "",
    bankName: "",
  });
  const [searchClient, setSearchClient] = useState("");
  const [balanceInCustody, setbalanceInCustody] = useState("");

  const handleBalanceInCustody = () => {
    console.log(balanceInCustody);
    if (balanceInCustody) {
      dispatch(updateMoneyClients(balanceInCustody));
    }
    setbalanceInCustody("");
    setClientSelected({});
  };
  // Constants
  const typesTransactions = [
    { value: "Compra", label: "Compra" },
    { value: "Venta", label: "Venta" },
    { value: "Cambio de cheque", label: "Cambio de cheque" },
  ];
  // Effects
  useEffect(() => {
    dispatch(getSubOffices());
    // Obtener información del usuario del localStorage
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setNewTransaction((prevState) => ({
        ...prevState,
        user: userInfo._id,
      }));
      setUserRol(userInfo.role);
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTransactions());
  }, [createTransactionsSuccess, deleteTransactionsSuccess]);
  useEffect(() => {
    if (hasGuardedBalance) {
      dispatch(getClients());
    } else {
      setClientSelected({});
    }
  }, [hasGuardedBalance, dispatch]);
  // Event handlers
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "subOfficeName") {
      const selectedOffice = subOffices.find((office) => office.name === value);
      if (selectedOffice) {
        setNewTransaction({
          ...newTransaction,
          subOfficeName: value,
          subOffice: selectedOffice._id,
        });
        setSubOfficeCurrencies(
          selectedOffice.currencies.map((c) => c.currency)
        );
      } else {
        setNewTransaction({
          ...newTransaction,
          subOfficeName: "",
          subOffice: "",
        });
        setSubOfficeCurrencies([]);
      }
    } else if (name === "sourceCurrencyCode") {
      const selectedCurrency = subOfficeCurrencies.find(
        (currency) => `${currency.name} - ${currency.code}` === value
      );
      if (selectedCurrency) {
        setNewTransaction({
          ...newTransaction,
          sourceCurrencyCode: value,
          sourceCurrency: selectedCurrency._id,
        });
      }
    } else if (name === "targetCurrencyCode") {
      const selectedCurrency = subOfficeCurrencies.find(
        (currency) => `${currency.name} - ${currency.code}` === value
      );
      if (selectedCurrency) {
        setNewTransaction({
          ...newTransaction,
          targetCurrencyCode: value,
          targetCurrency: selectedCurrency._id,
        });
      }
    } else if (name === "exchangeRate") {
      const numValue = value === "" ? 0 : Number(value);
      setNewTransaction({ ...newTransaction, [name]: numValue });
    } else if (name === "amount") {
      const numericValue = parseFloat(value);
      setNewTransaction({
        ...newTransaction,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      });
    } else if (name === "checkNumber" || name === "bankName") {
      setNewTransaction({ ...newTransaction, [name]: value });
    } else if (name === "checkDueDate") {
      setNewTransaction({ ...newTransaction, [name]: value });
    } else {
      setNewTransaction({ ...newTransaction, [name]: value });
    }
  };
  const handleNewTransaction = async () => {
    //e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(createTransactions(newTransaction, clientSelected._id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
    setNewTransaction((prevState) => ({
      ...prevState,
      type: "",
      amount: "",
      sourceCurrency: "",
      sourceCurrencyCode: "",
      targetCurrency: "",
      targetCurrencyCode: "",
      exchangeRate: "",
      subOffice: "",
      subOfficeName: "",
      checkNumber: "",
      checkDueDate: "",
      bankName: "",
    }));
  };
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const tableRef = useRef(null);
  const handleClickOutside = useCallback((event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditingTransaction(null);
      setEditedFields({});
    }
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction._id);
    setEditedFields({
      sourceAmount: transaction.sourceAmount,
      exchangeRate: transaction.exchangeRate,
      targetAmount: transaction.targetAmount,
      checkNumber: transaction.checkNumber || "",
      checkDueDate: transaction.checkDueDate || "",
      bankName: transaction.bankName || "",
    });
  };
  const handleEditChange = (field, value) => {
    setEditedFields((prev) => ({ ...prev, [field]: value }));
  };
  const handleSaveEdit = () => {
    //dispatch(updateTransaction(editingTransaction, editedFields));
    setEditingTransaction(null);
    setEditedFields({});
  };
  const handleDeleteTransaction = (transactionId) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar esta transacción?",
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
  const onFilterChange = (dateFilter) => {
    const monthRegex = /^\d{4}-\d{2}$/; // Formato YYYY-MM
    const dayRegex = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD
    if (monthRegex.test(dateFilter)) {
      // Es una fecha de mes (YYYY-MM)
      dispatch(getTransactionsForMonth(dateFilter));
    } else if (dayRegex.test(dateFilter)) {
      // Es una fecha de día (YYYY-MM-DD)
      dispatch(getTransactionsForDay(dateFilter));
    }
  };
  const [dataForm, setDataForm] = useState({
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: new Date().toISOString().split("T")[0],
  });
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDispatchData = () => {
    if (selectSubOffice && dataForm.dateFrom && dataForm.dateTo) {
      setIsLoadingTransactions(true);
      dispatch(getTransactionsRangeDate(selectSubOffice, dataForm))
        .then(() => {
          setIsLoadingTransactions(false);
        })
        .catch((error) => {
          setIsLoadingTransactions(false);
        });
    }
  };
  const handleClearTransactions = () => {
    setIsLoadingTransactions(true);
    dispatch(getTransactions())
      .then(() => {
        setIsLoadingTransactions(false);
        setSelectSubOffice("");
        setDataForm({
          dateFrom: new Date().toISOString().split("T")[0],
          dateTo: new Date().toISOString().split("T")[0],
        });
      })
      .catch((error) => {
        setIsLoadingTransactions(false);
        setSelectSubOffice("");
        setDataForm({
          dateFrom: new Date().toISOString().split("T")[0],
          dateTo: new Date().toISOString().split("T")[0],
        });
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
                        newTransaction.subOfficeName ? "has-value" : ""
                      }`}
                    >
                      <select
                        name="subOfficeName"
                        className="input-field-dashboard select"
                        style={{
                          color: newTransaction.subOfficeName ? "#000" : "#555",
                          cursor: "pointer",
                        }}
                        value={newTransaction.subOfficeName} // Asegura que esté sincronizado
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
                      onChange={handleSelectChange}
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
                          <option
                            key={currency._id}
                            value={`${currency.name} - ${currency.code}`}
                          >{`${currency.name} - ${currency.code}`}</option>
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
                          <option
                            key={currency._id}
                            value={`${currency.name} - ${currency.code}`}
                          >{`${currency.name} - ${currency.code}`}</option>
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
                      onChange={handleSelectChange}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Tasa de cambio
                    </label>
                  </div>
                  {newTransaction.type === "Cambio de cheque" && (
                    <>
                      <div className="input-box-dashboard">
                        <input
                          type="text"
                          className="input-field-dashboard"
                          name="checkNumber"
                          value={newTransaction.checkNumber}
                          onChange={handleSelectChange}
                        />
                        <label
                          className="label-input-dashboard"
                          style={{ backgroundColor: "rgba(255, 255, 255)" }}
                        >
                          Número de cheque
                        </label>
                      </div>
                      <div className="input-box-dashboard">
                        <input
                          type="date"
                          className="input-field-dashboard"
                          name="checkDueDate"
                          value={newTransaction.checkDueDate}
                          onChange={handleSelectChange}
                        />
                        <label
                          className="label-input-dashboard"
                          style={{ backgroundColor: "rgba(255, 255, 255)" }}
                        >
                          Fecha del cheque
                        </label>
                      </div>
                      <div className="input-box-dashboard">
                        <input
                          type="text"
                          className="input-field-dashboard"
                          name="bankName"
                          value={newTransaction.bankName}
                          onChange={handleSelectChange}
                        />
                        <label
                          className="label-input-dashboard"
                          style={{ backgroundColor: "rgba(255, 255, 255)" }}
                        >
                          Banco emisor
                        </label>
                      </div>
                    </>
                  )}
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
                  onCheckedChange={(checked) => {
                    setHasGuardedBalance(checked);
                    if (!checked) {
                      setClientSelected({});
                    }
                  }}
                />
                <label htmlFor="">Registrar Saldo en Guarda</label>
              </div>
              {hasGuardedBalance && (
                <div className="space-y-4 border-t pt-4">
                  <div
                  // style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {/*
                    
                    
                    <div className="container-input-btn">
                      <div className="input-box-dashboard">
                        <input
                          type="text"
                          className="input-field-dashboard"
                          name="client"
                          value={searchClient}
                          onChange={""}
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
                    */}

                    {/*
                    <div>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "rgb(31, 151, 243)",
                          display: "flex",
                          cursor: "pointer",
                        }}
                      >
                        Ver clientes <img src={arrow} alt="" />
                      </span>
                    </div>
                    */}
                  </div>
                  <div className="container-client-first-section">
                    {clients?.map((client) => (
                      <div
                        key={client._id}
                        className="container-client-saldo"
                        onClick={() => setClientSelected(client)}
                        style={{
                          backgroundColor:
                            clientSelected._id === client._id ? "#EFF6FF" : "",
                          border:
                            clientSelected._id === client._id
                              ? "1px solid #1F97F3"
                              : "",
                        }}
                      >
                        <span>{client.name}</span>{" "}
                        <span>{client.lastname}</span>
                      </div>
                    ))}
                  </div>
                  {/*
                  
                  
                  {clientSelected.name && (
                    <div>
                      <div className="input-box-dashboard">
                        <input
                          type="text"
                          className="input-field-dashboard"
                          value={balanceInCustody.money || ""}
                          onChange={(e) =>
                            setbalanceInCustody({
                              id: clientSelected._id, // ID del cliente seleccionado
                              money: e.target.value, // Valor del input
                            })
                          }
                        />
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
                        {clientSelected.name} {clientSelected.lastname}
                      </p>
                    </div>
                  )}
                  */}
                </div>
              )}
              <ModalNewClient isOpen={isModalOpen} onClose={handleCloseModal} />
              <div
                className="buttons-container"
                style={{ display: "flex", gap: "5px", justifyContent: "end" }}
              >
                <button
                  className="btn-search-users"
                  onClick={() => {
                    handleNewTransaction();
                    handleBalanceInCustody();
                  }}
                  disabled={
                    !newTransaction.subOffice ||
                    !newTransaction.type ||
                    !newTransaction.exchangeRate ||
                    !newTransaction.amount ||
                    !newTransaction.sourceCurrency ||
                    !newTransaction.targetCurrency
                  }
                >
                  <label htmlFor="submit" className="label">
                    {" "}
                    {isSubmitting ? <SpinnerSmall /> : "Registrar"}
                  </label>
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
              <div className="input-box-dashboard">
                <div
                  className={`select-container ${
                    selectSubOffice ? "has-value" : ""
                  }`}
                >
                  <select
                    name="selectSubOffice"
                    className="input-field-dashboard select"
                    style={{
                      color: selectSubOffice ? "#000" : "#555",
                      cursor: "pointer",
                    }}
                    value={selectSubOffice} // Asegura que esté sincronizado
                    onChange={(e) => setSelectSubOffice(e.target.value)}
                  >
                    <option value="">Seleccione sucursal</option>
                    {subOffices.map((office) => (
                      <option key={office._id} value={office._id}>
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
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div className="input-box-dashboard">
                <input
                  type="date"
                  className="input-field-dashboard"
                  name="dateFrom"
                  value={dataForm.dateFrom}
                  onChange={handleDateChange}
                />
                <label
                  className="label-input-dashboard"
                  style={{ backgroundColor: "rgba(255, 255, 255)" }}
                >
                  Filtre desde
                </label>
              </div>
              <div className="input-box-dashboard">
                <input
                  type="date"
                  className="input-field-dashboard"
                  name="dateTo"
                  value={dataForm.dateTo}
                  onChange={handleDateChange}
                />
                <label
                  className="label-input-dashboard"
                  style={{ backgroundColor: "rgba(255, 255, 255)" }}
                >
                  Hasta
                </label>
              </div>
            </div>
            {/*
            <div>
              <DateFilterDropdown
                onFilterChange={onFilterChange}
              ></DateFilterDropdown>
            </div>
            */}

            <button className="btn-search-users" onClick={handleDispatchData}>
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
            <button className="btn-clean" onClick={handleClearTransactions}>
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
          <div className="container-table" ref={tableRef}>
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
                    {userRol === "administrador" && <th>Acciones</th>}
                  </tr>
                </thead>
                {isLoadingTransactions ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                  >
                    <Spinner />
                  </div>
                ) : (
                  <tbody>
                    {transactions && transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <tr key={transaction._id}>
                          <td>{transaction.type}</td>
                          <td>{transaction.userName}</td>
                          <td>
                            {editingTransaction === transaction._id ? (
                              <input
                                type="text"
                                className="input-transaction"
                                value={editedFields.sourceAmount}
                                onChange={(e) =>
                                  handleEditChange(
                                    "sourceAmount",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              transaction.sourceAmount
                            )}
                          </td>
                          <td>{transaction.sourceCurrencyCode}</td>
                          <td>
                            {editingTransaction === transaction._id ? (
                              <input
                                type="text"
                                className="input-transaction"
                                value={editedFields.exchangeRate}
                                onChange={(e) =>
                                  handleEditChange(
                                    "exchangeRate",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              transaction.exchangeRate
                            )}
                          </td>
                          <td>
                            {editingTransaction === transaction._id ? (
                              <input
                                type="text"
                                className="input-transaction"
                                value={editedFields.targetAmount}
                                onChange={(e) =>
                                  handleEditChange(
                                    "targetAmount",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              transaction.targetAmount
                            )}
                          </td>
                          <td>{transaction.targetCurrencyCode}</td>
                          <td>
                            {editingTransaction === transaction._id ? (
                              <input
                                type="text"
                                className="input-transaction"
                                value={editedFields.checkNumber}
                                onChange={(e) =>
                                  handleEditChange(
                                    "checkNumber",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              transaction.checkNumber || "N/A"
                            )}
                          </td>
                          <td>
                            {editingTransaction === transaction._id ? (
                              <input
                                type="date"
                                className="input-transaction"
                                value={editedFields.checkDueDate}
                                onChange={(e) =>
                                  handleEditChange(
                                    "checkDueDate",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              transaction.checkDueDate || "N/A"
                            )}
                          </td>
                          <td>
                            {editingTransaction === transaction._id ? (
                              <input
                                type="text"
                                className="input-transaction"
                                value={editedFields.bankName}
                                onChange={(e) =>
                                  handleEditChange("bankName", e.target.value)
                                }
                              />
                            ) : (
                              transaction.bankName || "N/A"
                            )}
                          </td>
                          <td>
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
                          </td>
                          <td>{transaction.subOfficeName}</td>
                          {userRol === "administrador" && (
                            <td>
                              <button
                                className="btn-edit edit-button"
                                onClick={() =>
                                  editingTransaction === transaction._id
                                    ? handleSaveEdit()
                                    : handleEditClick(transaction)
                                }
                              >
                                {/* 
                            {editingTransaction === transaction._id ? (
                              <button className="btn-new-client">
                                {" "}
                                Guardar{" "}
                              </button>
                            ) : (
                              <button className="btn-new-client">
                                {" "}
                                Editar{" "}
                              </button>
                            )}
                            */}
                              </button>
                              <button
                                className="btn-trash"
                                onClick={() =>
                                  handleDeleteTransaction(transaction._id)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="13px"
                                  viewBox="0 -960 960 960"
                                  width="13px"
                                  fill="white"
                                >
                                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                </svg>
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="13" style={{ textAlign: "center" }}>
                          No hay transacciones disponibles
                        </td>
                      </tr>
                    )}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};
export default Transactions;
