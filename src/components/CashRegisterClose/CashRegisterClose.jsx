import "./CashRegisterClose.css";
import imgArrows from "./../../assets/arrows.svg";
import imgIncome from "./../../assets/arrowIncome.svg";
import imgExpense from "./../../assets/arrowExpense.svg";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  closeCashRegister,
  verifyCashRegisterOpen,
  clearCashRegisterError,
  getTransactionsAndMovements,
} from "@/redux/actions/cashRegisterActions";
import Swal from "sweetalert2";
import Spinner from "@/utils/Spinner/Spinner";

const fieldFilter = ["Moneda/Cuenta", "Usuario"];

const CashRegisterClose = () => {
  const dispatch = useDispatch();
  const [selectedSubOffice, setSelectedSubOffice] = useState("");
  const [closeRegister, setCloseRegister] = useState(false);
  const [closingTime, setClosingTime] = useState(null);
  const [pesoRate, setPesoRate] = useState("");
  const [dollarRate, setDollarRate] = useState("");
  const [selectType, setSelectType] = useState("");
 // const [userRol, setUserRol] = useState("");
  console.log(selectedSubOffice);

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
  const closedCashRegister = useSelector(
    (state) => state.cashRegister.closedCashRegister
  );
  console.log(transactionsAndMovements);

  const handleCloseRegister = () => {
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
    setClosingTime(formattedTime);
    setCloseRegister(true);
  };

  const handleCloseCashRegister = () => {
    Swal.fire({
      title: "¿Seguro que desea cerrar la caja?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          closeCashRegister(
            verificatedCashRegisterOpen._id,
            dollarRate,
            pesoRate
          )
        );
        handleCloseRegister();
      }
    });
  };

  const handleSubOfficeChange = (e) => {
    const selectedOffice = e.target.value;
    setSelectedSubOffice(selectedOffice);
    if (selectedOffice) {
      dispatch(clearCashRegisterError());
      dispatch(verifyCashRegisterOpen(selectedOffice));
    }
  };

  const handleExchangeRateSubmit = (e) => {
    e.preventDefault();
    if (pesoRate && dollarRate) {
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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (closedCashRegister) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [closedCashRegister]);

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

  /*useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);

      setUserRol(userInfo.role);
    }
  }, []);*/

  useEffect(() => {
    if (selectedSubOffice) {
      dispatch(getTransactionsAndMovements(selectedSubOffice));
    }
  }, [selectedSubOffice]);

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

      {closedCashRegister && (
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
                <select
                  className="input-field-dashboard"
                  style={{
                    color: selectType ? "#000" : "#555",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Seleccione un campo para filtrar</option>
                  {fieldFilter.map((field, index) => (
                    <option key={index} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
                <label className="label-input-dashboard-close-register"></label>
              </div>
            </div>
            <div className="input-group">
              <div className="input-box-dashboard">
                <input
                  type="text"
                  value={selectType}
                  className="input-field-dashboard"
                  required
                />
                <label className="label-input-dashboard-close-register">
                  Ingrese valor
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="container-table">
          <div className="tbl-container-cash-close">
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
                  <th>Descripcion</th>
                  <th>Hora</th>
                  <th>Sucursal</th>
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
                        <span style={{ display: "flex", alignItems: "center" }}>
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
                        <span>{movimiento.sourceCurrencyCode || "N/A"}</span>
                      </td>
                      <td data-table="T/C">
                        <span>{movimiento.exchangeRate || "N/A"}</span>
                      </td>
                      <td data-table="Monto de egreso">
                        {movimiento.targetAmount || "N/A"}
                      </td>
                      <td data-table="Compra">
                        <span>{movimiento.targetCurrencyCode || "N/A"}</span>
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
                      <td data-table="Sucursal">
                        <span>
                          {movimiento.subOfficeName ||
                            movimiento.sub_office.name}
                        </span>
                      </td>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default CashRegisterClose;
