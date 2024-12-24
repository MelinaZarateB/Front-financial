import "./Income.css";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../utils/theme";
import { Switch } from "../ui/switch";
import { useDispatch, useSelector } from "react-redux";
import {
  createIncome,
  getIncomes,
  filterIncome,
  cleanFilter,
} from "@/redux/actions/incomesActions";
import { deleteMovement } from "@/redux/actions/movementsActions";
import SpinnerSmall from "./../../utils/Spinner/SpinnerSmall";
import Swal from "sweetalert2";

const Income = () => {
  const dispatch = useDispatch();
  const [hasGuardedBalance, setHasGuardedBalance] = useState(false);
  const clients = useSelector((state) => state.clients.clients);
  const [clientSelected, setClientSelected] = useState({});
  const subOffices = useSelector((state) => state.offices.subOffices);

  const createdIncome = useSelector((state) => state.incomes.createdIncome);
  const incomesFiltered = useSelector((state) => state.incomes.incomesFiltered);
  const incomes = useSelector((state) => state.incomes.incomes);
  const [userRol, setUserRol] = useState("");
  const deleteMovements = useSelector(
    (state) => state.movements.deleteMovement
  );
  const [subOfficeCurrencies, setSubOfficeCurrencies] = useState([]);
  const [viewForm, setViewForm] = useState(false);
  const [selectType, setSelectType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newIncome, setNewIncome] = useState({
    subOffice: "",
    amount: "",
    type: "",
    category: "ingreso",
    user: "",
    description: "",
    currency: "",
  });

  const handleChangeNewIncome = (event) => {
    const { name, value } = event.target;
    setNewIncome((prevState) => ({
      ...prevState,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    }));
  };
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "subOffice") {
      const selectedOffice = subOffices.find((office) => office.name === value);
      if (selectedOffice) {
        setNewIncome({
          ...newIncome,
          subOffice: selectedOffice._id,
        });
        setSubOfficeCurrencies(
          selectedOffice.currencies.map((c) => c.currency)
        );
      } else {
        setNewIncome({
          ...newIncome,
          subOffice: "",
        });
        setSubOfficeCurrencies([]);
      }
    }
  };

  const [dataForm, setDataForm] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });

  const handleChangeType = (event) => {
    setSelectType(event.target.value);
  };
  const changeForm = () => {
    if (viewForm === false) setViewForm(true);
    else {
      setViewForm(false);
    }
  };
  useEffect(() => {
    dispatch(getIncomes());
  }, [deleteMovements, createdIncome]);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setNewIncome((prevState) => ({
        ...prevState,
        user: userInfo._id,
      }));
      setUserRol(userInfo.role);
    }
  }, []);

  const handleNewIncome = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(createIncome(newIncome, clientSelected._id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
    setNewIncome({
      type: "",
      description: "",
      amount: "",
      subOffice: "",
      currency: "",
      category: "ingreso",
      user: newIncome.user,
    });
  };

  const handleFilterType = () => {
    dispatch(filterIncome(selectType));
  };
  const handleCleanFilter = () => {
    dispatch(cleanFilter());
    setSelectType("");
  };

  const handleDeleteMovement = (idMovement) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar este ingreso?",
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
        dispatch(deleteMovement(idMovement));
      }
    });
  };
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

  return (
    <ThemeProvider theme={theme}>
      <section className="section-expense">
        <div>
          <button
            className="btn-create-user"
            onClick={changeForm}
            style={{
              borderBottomLeftRadius: viewForm ? "0px" : "4px",
              borderBottomRightRadius: viewForm ? "0px" : "4px",
            }}
          >
            Registrar ingreso
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
                  <div
                    className={`select-container ${
                      newIncome.subOffice ? "has-value" : ""
                    }`}
                  >
                    <select
                      name="subOffice" // Este name debe coincidir con la propiedad en newTransaction
                      className="input-field-dashboard select"
                      style={{
                        color: newIncome.subOffice ? "#000" : "#555",
                        cursor: "pointer",
                      }}
                      // Asegura que esté sincronizado
                      onChange={handleSelectChange}
                      value={newIncome.subOffice}
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

                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="type"
                      value={newIncome.type}
                      onChange={handleChangeNewIncome}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Tipo de ingreso
                    </label>
                  </div>

                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="amount"
                      value={newIncome.amount}
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
                    <div
                      className={`select-container ${
                        newIncome.currency ? "has-value" : ""
                      }`}
                    >
                      <select
                        name="currency" // Este name debe coincidir con la propiedad en newTransaction
                        className="input-field-dashboard select"
                        style={{
                          color: newIncome.currency ? "#000" : "#555",
                          cursor: "pointer",
                        }}
                        value={newIncome.currency} // Asegura que esté sincronizado
                        onChange={handleChangeNewIncome}
                      >
                        <option value="">Moneda</option>
                        {subOfficeCurrencies.map((currency) => (
                          <option
                            key={currency._id}
                            value={currency._id}
                          >{`${currency.name} - ${currency.code}`}</option>
                        ))}
                      </select>
                      <div
                        className="floating-label"
                        style={{ backgroundColor: "rgba(255, 255, 255)" }}
                      >
                        Moneda
                      </div>
                    </div>
                  </div>

                  <div className="textarea-box-dashboard">
                    <textarea
                      className="textarea-field-dashboard"
                      name="description"
                      value={newIncome.description}
                      placeholder=" "
                      onChange={handleChangeNewIncome}
                    ></textarea>
                    <label className="label-textarea-dashboard">
                      Descripcion del ingreso
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
                  onCheckedChange={(checked) => {
                    setHasGuardedBalance(checked);
                    if (!checked) {
                      setClientSelected({});
                    }
                  }}
                />
                <label htmlFor="">Registrar Pago a Cliente</label>
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
                     
                        >
                          <span>Nuevo cliente</span>
                       
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

              <div
                style={{ display: "flex", gap: "5px", justifyContent: "end" }}
              >
                <button
                  className="btn-search-users"
                  onClick={handleNewIncome}
                  disabled={
                    !newIncome.type ||
                    !newIncome.description ||
                    !newIncome.subOffice ||
                    !newIncome.currency
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

        <div>
          <div className="container-search-purchase">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "3px",
              }}
            >
              <div className="input-box-dashboard">
                <input
                  type="text"
                  className="input-field-dashboard"
                  name="type"
                  value={selectType}
                  onChange={(e) => setSelectType(e.target.value)}
                />
                <label className="label-input-dashboard">
                  Buscar ingreso por tipo
                </label>
              </div>

              <button className="btn-search-users" onClick={handleFilterType}>
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
              <button className="btn-clean" onClick={handleCleanFilter}>
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
          </div>
          <div className="container-table">
            <div className="tbl-container">
              <table className="tbl-expense">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Usuario</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                    <th>Moneda</th>
                    <th>Fecha</th>
                    <th>Sucursal</th>
                    <th colSpan="1"></th>
                  </tr>
                </thead>
                <tbody>
                  {(incomesFiltered.length > 0 ? incomesFiltered : incomes)
                    .length > 0 ? (
                    (incomesFiltered.length > 0
                      ? incomesFiltered
                      : incomes
                    ).map((income) => (
                      <tr key={income._id}>
                        <td data-table="Tipo">
                          <span>{income.type}</span>
                        </td>
                        <td data-table="Usuario">
                          <span>{income.user.username}</span>
                        </td>
                        <td data-table="Descripción">
                          <span>{income.description}</span>
                        </td>
                        <td data-table="Monto">
                          <span>$ {income.amount.toFixed(2)}</span>
                        </td>
                        <td data-table="Moneda">{income.currency.name}</td>
                        <td data-table="Fecha">
                          <span>
                            {new Date(income.date)
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
                        <td data-table="Sucursal">
                          <span>{income.sub_office.name}</span>
                        </td>
                        {userRol === "administrador" && (
                          <td>
                            <button
                              className="btn-trash"
                              onClick={() => handleDeleteMovement(income._id)}
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
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        No hay ingresos disponibles
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

export default Income;
