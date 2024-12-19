import "./CashRegisterClose.css";
import imgArrows from "./../../assets/arrows.svg";
import imgIncome from "./../../assets/arrowIncome.svg";
import imgExpense from "./../../assets/arrowExpense.svg";
import { useState, useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  closeCashRegister,
  verifyCashRegisterOpen,
  clearCashRegisterError,
  getTransactionsAndMovements,
  clearTransactionsAndMovements,
  filterTransactiosAndMovements,
  totalMovementsForDay,
  totalTransactionsForDay,
  cleanMessage,
  cleanFilter
} from "@/redux/actions/cashRegisterActions";
import Swal from "sweetalert2";
import Spinner from "@/utils/Spinner/Spinner";
import { getAllUsers } from "@/redux/actions/userActions";

const fieldFilter = ["Moneda/Cuenta", "Usuario"];


const CashRegisterClose = () => {
  const dispatch = useDispatch();
  const [selectedSubOffice, setSelectedSubOffice] = useState("");
  const [closeRegister, setCloseRegister] = useState(false);
  const [closingTime, setClosingTime] = useState(null);
  const [pesoRate, setPesoRate] = useState("");
  const [dollarRate, setDollarRate] = useState("");
  const [selectType, setSelectType] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [valueOptions, setValueOptions] = useState([]);
  // const [userRol, setUserRol] = useState("");

  const subOffices = useSelector((state) => state.offices.subOffices);
  const transactionsAndMovements = useSelector(
    (state) => state.cashRegister.transactionsAndMovements
  );
  const noConfirmOpenCashRegister = useSelector(
    (state) => state.cashRegister.error
  );
  const verificatedCashRegisterOpen = useSelector(
    (state) => state.cashRegister.verifyCashRegister
  );
  console.log('HOLAA',verificatedCashRegisterOpen)
  const closedCashRegister = useSelector(
    (state) => state.cashRegister.closedCashRegister
  );
  const totalTransactions = useSelector(
    (state) => state.cashRegister.totalTransactionsForDay
  );
  const totalMovements = useSelector(
    (state) => state.cashRegister.totalMovementsForDay
  );
  const users = useSelector((state) => state.user.users);
  const [isLoadingMovements, setIsLoadingMovements] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseRegister = () => {
    // Obtiene la fecha y hora actual y la formatea en español
    const now = new Date();
    const formattedTime = now.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    // Actualiza el estado con la hora de cierre y marca el registro como cerrado
    setClosingTime(formattedTime);
    setCloseRegister(true);
  };

  // Maneja el proceso de cierre de caja con confirmación del usuario
  const handleCloseCashRegister = () => {
    Swal.fire({
      title: "¿Seguro que desea cerrar la caja?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, despacha cada acción por separado
        dispatch(
          closeCashRegister(
            verificatedCashRegisterOpen._id,
            dollarRate,
            pesoRate
          )
        );
        dispatch(totalMovementsForDay(verificatedCashRegisterOpen._id));
        dispatch(totalTransactionsForDay(verificatedCashRegisterOpen._id));

        handleCloseRegister();
      }
    });
  };

  // Maneja el cambio de selección de sucursal
  const handleSubOfficeChange = (e) => {
    const selectedOffice = e.target.value;
    setSelectedSubOffice(selectedOffice);
    if (selectedOffice) {
      // Limpia errores previos y verifica si hay una caja abierta para la sucursal seleccionada
      dispatch(clearCashRegisterError());
      dispatch(verifyCashRegisterOpen(selectedOffice));
    }
  };

  // Maneja la actualización de las tasas de cambio
  const handleExchangeRateSubmit = (e) => {
    e.preventDefault();
    if (pesoRate && dollarRate) {
      // Actualiza las tasas de cambio y muestra una notificación de éxito
      dispatch(
        updateExchangeRates(selectedSubOffice, { pesoRate, dollarRate })
      );
      Swal.fire({
        title: "Tasas de cambio actualizadas",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  // Efecto para mostrar un spinner durante 2 segundos después de cerrar la caja
  useEffect(() => {
    if (closedCashRegister) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [closedCashRegister]);

  // Efecto para manejar errores al abrir la caja
  useEffect(() => {
    if (noConfirmOpenCashRegister !== "") {
      Swal.fire({
        text: noConfirmOpenCashRegister,
        icon: "error",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          setSelectedSubOffice("");
        }
      });
    }
  }, [noConfirmOpenCashRegister]);

  // Efecto para cargar transacciones y movimientos cuando se selecciona una sucursal
  useEffect(() => {
    if (selectedSubOffice) {
      setIsLoadingMovements(true);
      dispatch(getTransactionsAndMovements(selectedSubOffice))
        .then(() => setIsLoadingMovements(false))
        .catch(() => setIsLoadingMovements(false));
    } else {
      dispatch(clearTransactionsAndMovements());
    }
  }, [selectedSubOffice, dispatch]);

  // Función para obtener el ícono correspondiente a cada tipo de transacción
  const getTypeIcon = (category) => {
    switch (category) {
      case "ingreso":
        return (
          <img
            src={imgIncome}
            alt="Ingreso"
            title="Ingreso"
            style={{ margin: "0 auto" }}
          />
        );
      case "egreso":
        return (
          <img
            src={imgExpense}
            alt="Egreso"
            title="Egreso"
            style={{ margin: "0 auto" }}
          />
        );
      default:
        return (
          <img
            src={imgArrows}
            alt={"transacción"}
            title={"transacción"}
            style={{ margin: "0 auto" }}
          />
        );
    }
  };

  // Efecto para cargar todos los usuarios al montar el componente
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // Efecto para actualizar las opciones de filtro basadas en el campo seleccionado
  useEffect(() => {
    if (selectedField === "Moneda/Cuenta" && selectedSubOffice) {
      const selectedOffice = subOffices.find(
        (office) => office._id === selectedSubOffice
      );
      if (selectedOffice) {
        const currencies = selectedOffice.currencies.map((curr) => ({
          id: curr.currency._id,
          name: `${curr.currency.name} (${curr.currency.code})`,
        }));
        setValueOptions(currencies);
      }
    } else if (selectedField === "Usuario") {
      setValueOptions(
        users.map((user) => ({ id: user._id, name: user.username }))
      );
    } else {
      setValueOptions([]);
    }
  }, [selectedField, selectedSubOffice, subOffices, users]);

  // Maneja el cambio en el campo de filtro seleccionado
  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
    setSelectedValue("");
  };

  // Maneja el cambio en el valor seleccionado para el filtro
  const handleValueChange = (e) => {
    setSelectedValue(e.target.value);
  };

  // Aplica los filtros seleccionados a los movimientos
  const handleFilterMovements = () => {
    let filterData = {};
    if (selectedField === "Usuario") {
      filterData = { userId: selectedValue };
    } else if (selectedField === "Moneda/Cuenta") {
      filterData = { currencyId: selectedValue };
    }

    setIsLoadingMovements(true);
    dispatch(filterTransactiosAndMovements(selectedSubOffice, filterData))
      .then(() => setIsLoadingMovements(false))
      .catch(() => setIsLoadingMovements(false));
  };

  // Limpia los filtros aplicados y recarga todos los movimientos
  const handleCleanFilter = () => {
    setIsLoadingMovements(true);
    dispatch(getTransactionsAndMovements(selectedSubOffice))
      .then(() => {
        setIsLoadingMovements(false);
        setSelectedField("");
        setSelectedValue("");
        setValueOptions([]);
      })
      .catch(() => {
        setIsLoadingMovements(false);
        // Manejar error si es necesario
      });
  };
 useEffect(() => {

  return () => {
    setSelectedSubOffice('')
    dispatch(cleanFilter())

  }

 }, [])
  return (
    <section className="container-cash-closing">
      <div className="first-section-cash-close">
        <div className="container-btn-cash-close">
          <button
            className="btn-close-cash"
            disabled={!selectedSubOffice || !pesoRate || !dollarRate}
            onClick={handleCloseCashRegister}
          >
            Cerrar caja
          </button>
        </div>
        <div className="input-group">
          <div className="input-box-dashboard">
            <select
              value={selectedSubOffice}
              onChange={handleSubOfficeChange}
              className="input-field-dashboard"
              style={{
                color: selectedSubOffice ? "#000" : "#555",
                cursor: "pointer",
              }}
            >
              <option value="">Seleccionar sucursal</option>
              {subOffices.map((office) => (
                <option key={office._id} value={office._id}>
                  {office.name}
                </option>
              ))}
            </select>
            <label className="label-input-dashboard">Sucursal</label>
          </div>
        </div>
        {verificatedCashRegisterOpen && selectedSubOffice && (
          <form
            onSubmit={handleExchangeRateSubmit}
            style={{ display: "flex", gap: "5px" }}
          >
            <div className="input-group">
              <div className="input-box-dashboard">
                <input
                  type="text"
                  value={pesoRate}
                  onChange={(e) => setPesoRate(e.target.value)}
                  className="input-field-dashboard"
                  required
                />
                <label className="label-input-dashboard">Tasa en pesos</label>
              </div>
            </div>
            <div className="input-group">
              <div className="input-box-dashboard">
                <input
                  type="text"
                  value={dollarRate}
                  onChange={(e) => setDollarRate(e.target.value)}
                  className="input-field-dashboard"
                  required
                />
                <label className="label-input-dashboard">Tasa en dólares</label>
              </div>
            </div>
          </form>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <h3>Saldo inicial en USD: </h3>
        <span
          style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "0.4rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {verificatedCashRegisterOpen?.opening_balance ?? " 0.00"}
        </span>
      </div>

      {closedCashRegister && totalMovements && totalTransactions && (
        <div className="container-balance">
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner />
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="span-balance">Balance final en USD: </span>
                <span className="span-monto-balance">
                  $ {closedCashRegister.closing_balance}
                </span>
              </div>
              <div className="difference-balance">
                Diferencia: $ {closedCashRegister.difference}
              </div>
            </>
          )}
        </div>
      )}

      {closedCashRegister && !isLoading && (
        <div className="section-cash-closing">
          <div>Caja cerrada exitosamente el {closingTime}</div>
        </div>
      )}

      <div style={{width: '100%'}}>
      {totalMovements && totalTransactions && closedCashRegister &&  (
        <div className="container-total">
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems:'center' }}>
              <Spinner />
            </div>
          ) : (
            <>
              <div className="card">
                <h2 className="card-title">Total de Transacciones</h2>
                <table className="table-total">
                  <thead>
                    <tr>
                      <th>Concepto</th>
                      <th className="amount-total">Monto (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ingresos</td>
                      <td className="amount-total">
                       $ {totalTransactions.totalIncomeUSD.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td>Gastos</td>
                      <td className="amount-total">
                        $ {totalTransactions.totalExpensesUSD.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td>Ingresos por Cheques</td>
                      <td className="amount-total">
                        $ {totalTransactions.checkIncomeUSD.toFixed(2)}
                      </td>
                    </tr>
                    <tr className="total">
                      <td>Balance</td>
                      <td className="amount-total">
                       $ {
                          totalTransactions.totalIncomeUSD +
                            totalTransactions.checkIncomeUSD -
                            totalTransactions.totalExpensesUSD
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="card">
                <h2 className="card-title">Total de Movimientos</h2>
                <table className="table-total">
                  <thead>
                    <tr>
                      <th>Concepto</th>
                      <th className="amount-total">Monto (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ingresos</td>
                      <td className="amount-total">
                       $ {totalMovements.incomeUSD.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td>Gastos</td>
                      <td className="amount-total">
                       $ {totalMovements.expensesUSD.toFixed(2)}
                      </td>
                    </tr>
                    <tr className="total">
                      <td>Balance</td>
                      <td className="amount-total">
                      $  {
                          totalMovements.incomeUSD - totalMovements.expensesUSD
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
      </div>

      {selectedSubOffice && (
        <div>
          <div
            style={{
              backgroundColor: "white",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h2 style={{ fontWeight: "600" }}>Movimientos del día</h2>
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <div className="input-group">
                <div className="input-box-dashboard">
                  <div
                    className={`select-container ${
                      selectedField ? "has-value" : ""
                    }`}
                  >
                    <select
                      className="input-field-dashboard select"
                      style={{
                        color: selectedField ? "#000" : "#555",
                        cursor: "pointer",
                      }}
                      value={selectedField}
                      onChange={handleFieldChange}
                    >
                      <option value="">Seleccione un campo para filtrar</option>
                      {fieldFilter.map((field, index) => (
                        <option key={index} value={field}>
                          {field}
                        </option>
                      ))}
                    </select>
                    <div
                      className="floating-label"
                      style={{ backgroundColor: "white" }}
                    >
                      Campo
                    </div>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <div className="input-box-dashboard">
                  <div
                    className={`select-container ${
                      selectedValue ? "has-value" : ""
                    }`}
                  >
                    <select
                      className="input-field-dashboard select"
                      style={{
                        color: selectedValue ? "#000" : "#555",
                        cursor: "pointer",
                      }}
                      value={selectedValue}
                      onChange={handleValueChange}
                      disabled={
                        !selectedField ||
                        (selectedField === "Moneda/Cuenta" &&
                          !selectedSubOffice)
                      }
                    >
                      <option value="">Seleccione valor</option>
                      {valueOptions?.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <div
                      className="floating-label"
                      style={{ backgroundColor: "white" }}
                    >
                      Valor
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn-search-users"
                onClick={handleFilterMovements}
              >
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
            <div className="tbl-container-cash-close">
              {isLoadingMovements ? (
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
                <table className="tbl-cash">
                  <thead>
                    <tr>
                      <th>Categoria</th>
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
                      <th>Monto</th>
                      <th>Moneda</th>
                      <th>Descripcion</th>
                      <th>Hora</th>
                      {/*
                    <th>Sucursal</th>
                    
                    */}
                      {/*
                  {userRol === "administrador" && <th>Acciones</th>}
                  */}
                    </tr>
                  </thead>
                  <tbody>
                    {transactionsAndMovements &&
                    transactionsAndMovements.length > 0 ? (
                      transactionsAndMovements.map((movimiento) => (
                        <tr key={movimiento._id}>
                          <td data-table="Categoria">
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {movimiento.category || "transacción"}{" "}
                              {getTypeIcon(movimiento.category)}
                            </span>
                          </td>

                          <td data-table="Tipo">{movimiento.type || "N/A"}</td>
                          <td data-table="Usuario">
                            <span>{movimiento.user.username}</span>
                          </td>
                          <td data-table="Monto">
                            <span> {movimiento.targetAmount || "N/A"}</span>
                          </td>
                          <td data-table="Paga">
                            <span>
                              {movimiento.sourceCurrencyCode || "N/A"}
                            </span>
                          </td>
                          <td data-table="T/C">
                            <span>{movimiento.exchangeRate || "N/A"}</span>
                          </td>
                          <td data-table="Monto de egreso">
                            {movimiento.targetAmount || "N/A"}
                          </td>
                          <td data-table="Compra">
                            <span>
                              {movimiento.targetCurrencyCode || "N/A"}
                            </span>
                          </td>
                          <td data-table="Numero de cheque">
                            {movimiento.checkNumber || "N/A"}
                          </td>
                          <td data-table="Fecha de cheque">
                            {movimiento.checkDueDate || "N/A"}
                          </td>
                          <td data-table="Banco emisor">
                            {movimiento.bankName || "N/A"}
                          </td>
                          <td data-table="Monto">
                            {movimiento.amount || "N/A"}
                          </td>
                          <td data-table="Moneda">
                            {movimiento.currency.name || "N/A"}
                          </td>
                          <td data-table="Descripcion">
                            <span style={{ whiteSpace: "wrap" }}>
                              {movimiento.description || "N/A"}
                            </span>
                          </td>
                          <td data-table="Hora">
                            <span>
                              {new Date(movimiento.createdAt).toLocaleString(
                                "es-ES",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </span>
                          </td>
                          {/*
                        <td data-table="Sucursal">
                          <span>
                            {movimiento.subOfficeName ||
                              movimiento.sub_office.name}
                          </span>
                        </td>
                        
                        */}
                          {/*
                      {userRol === 'administrador' && (
                        <td>
                          <button className="btn-trash">Eliminar</button>
                        </td>
                      )}
                      */}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          No hay movimientos del día
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CashRegisterClose;
