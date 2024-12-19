import { useEffect, useState, useCallback } from "react";
import "./CashRegisterOpen.css";
import ModalCreateCurrency from "@/visuals/Modals/ModalCreateCurrency/ModalCreateCurrency";
import arrowDown from "./../../assets/arrow-down.svg";
import {
  getCurrencies,
  deleteCurrency,
  openCashRegister,
  updateMultipleStockCurrencies,
  updateMultipleCurrencies,
  cleanMessage
} from "@/redux/actions/cashRegisterActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/utils/Spinner/Spinner";
import Swal from "sweetalert2";
import imgPencil from "./../../assets/pencil.svg";

const CashRegisterOpen = () => {
  // Estados locales del componente
  const [isModalOpen, setModalOpen] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [closingTime, setClosingTime] = useState(null);
  const [monedasLocales, setMonedasLocales] = useState([]);
  const [selectedSubOffice, setSelectedSubOffice] = useState("");
  const [totalDolarizado, setTotalDolarizado] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [updates, setUpdates] = useState([]);
  const [stockUpdates, setStockUpdates] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(1); // Nuevo estado para la tasa de cambio en dólares

  // Hooks de Redux
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.offices.currencies);
  const subOffices = useSelector((state) => state.offices.subOffices);
  const confirmOpenCashRegister = useSelector(
    (state) => state.cashRegister.openCashRegister
  );

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  const actualizarStock = (currencyId, nuevoStock) => {
    const actualizado = monedasLocales.map((currency) =>
      currency._id === currencyId
        ? { ...currency, stock: Number(nuevoStock) }
        : currency
    );
    setMonedasLocales(actualizado);
    calcularTotalDolarizado(actualizado);
  };

  const actualizarTasaAplicada = (currencyId, nuevaTasa) => {
    const tasaNormalizada = nuevaTasa.replace(",", ".");
    if (!isNaN(tasaNormalizada)) {
      const actualizado = monedasLocales.map((currency) =>
        currency._id === currencyId
          ? { ...currency, exchangeRate: Number(tasaNormalizada) }
          : currency
      );
      setMonedasLocales(actualizado);
      calcularTotalDolarizado(actualizado);
    }
  };

  const handleDeleteCurrency = (idCurrency) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar esta moneda?",
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
        dispatch(deleteCurrency(idCurrency));
      }
    });
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const toggleCurrenciesVisibility = () => setShowCurrencies(!showCurrencies);

  const handleOpenCashRegister = () => {
    Swal.fire({
      title: "¿Desea abrir caja?",
      text: `Total en USD: ${totalDolarizado.toFixed(2)}`,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const fechaActual = new Date().toISOString();
        dispatch(
          openCashRegister({
            date: fechaActual,
            sub_office: selectedSubOffice,
            opening_balance: totalDolarizado,
          })
        );
        if (updates) {
          dispatch(updateMultipleCurrencies(updates));
        }
        if (stockUpdates) {
          dispatch(
            updateMultipleStockCurrencies(selectedSubOffice, stockUpdates)
          );
        }
        handleCloseRegister();
      }
    });
  };

  const handleCloseRegister = () => {
    const now = new Date();
    setClosingTime(
      now.toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );
  };

  const handleEditStart = (currency, field) => {
    setEditingId(currency.currency._id);
    setEditingField(field);
    setEditValue(
      field === "exchangeRate"
        ? currency.exchangeRate.toString()
        : currency.stock.toString()
    );
  };

  const handleEditEnd = (currency) => {
    setEditingId(null);
    setEditingField(null);
    if (
      editValue !==
      (editingField === "exchangeRate"
        ? currency.exchangeRate.toString()
        : currency.stock.toString())
    ) {
      const newValue = parseFloat(editValue);
      if (editingField === "exchangeRate") {
        setUpdates((prevUpdates) => {
          const existingUpdateIndex = prevUpdates.findIndex(
            (update) => update.currencyId === currency.currency._id
          );
          if (existingUpdateIndex !== -1) {
            const newUpdates = [...prevUpdates];
            newUpdates[existingUpdateIndex] = {
              ...newUpdates[existingUpdateIndex],
              exchangeRate: newValue,
            };
            return newUpdates;
          } else {
            return [
              ...prevUpdates,
              {
                currencyId: currency.currency._id,
                exchangeRate: newValue,
              },
            ];
          }
        });
        actualizarTasaAplicada(currency._id, editValue);
      } else if (editingField === "stock") {
        setStockUpdates((prevUpdates) => {
          const existingUpdateIndex = prevUpdates.findIndex(
            (update) => update.currencyId === currency.currency._id
          );
          if (existingUpdateIndex !== -1) {
            const newUpdates = [...prevUpdates];
            newUpdates[existingUpdateIndex] = {
              ...newUpdates[existingUpdateIndex],
              amount: newValue,
              operation: "set",
            };
            return newUpdates;
          } else {
            return [
              ...prevUpdates,
              {
                currencyId: currency.currency._id,
                amount: newValue,
                operation: "set",
              },
            ];
          }
        });
        actualizarStock(currency._id, editValue);
      }
    }
  };

  const handleKeyDown = (e, currency) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditEnd(currency);
    }
  };

  // Nuevo manejador para actualizar la tasa de cambio en dólares
  const calcularTotalDolarizado = useCallback(() => {
    const totalPesos = monedasLocales.reduce((acc, currency) => {
      return acc + currency.stock * currency.exchangeRate;
    }, 0);
    const total = exchangeRate > 0 ? totalPesos / exchangeRate : 0;
    setTotalDolarizado(total);
  }, [monedasLocales, exchangeRate]);

  useEffect(() => {
    if (selectedSubOffice) {
      setIsLoading(true);
      const office = subOffices.find(
        (office) => office._id === selectedSubOffice
      );
      if (office) {
        const updatedCurrencies = office.currencies.map((c) => ({
          ...c,
          exchangeRate: c.currency.exchangeRate,
          stock: c.stock || 0,
        }));
        setMonedasLocales(updatedCurrencies);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    return () => {
      dispatch(cleanMessage())
    }
  }, [selectedSubOffice, subOffices]);

  useEffect(() => {
    calcularTotalDolarizado();
  }, [monedasLocales, exchangeRate, calcularTotalDolarizado]);

  const handleExchangeRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    if (!isNaN(newRate) && newRate > 0) {
      setExchangeRate(newRate);
    }
  };
  return (
    <div className="section-cash-opening">
      <div className="container-btn-cash-close">
        <button className="btn-close-cash" onClick={handleOpenCashRegister}>
          Abrir caja
        </button>
      </div>

      <div className="input-group">
        <div className="input-box-dashboard">
          <select
            value={selectedSubOffice}
            onChange={(e) => setSelectedSubOffice(e.target.value)}
            className="input-field-dashboard"
          >
            <option value="">Seleccionar sucursal</option>
            {subOffices?.map((office) => (
              <option key={office._id} value={office._id}>
                {office.name}
              </option>
            ))}
          </select>
          <label className="label-input-dashboard">Sucursal</label>
        </div>
      </div>

      {/* Nuevo input para la tasa de cambio en dólares */}
      <div className="input-group">
        <div className="input-box-dashboard">
          <input
            type="text"
            onChange={handleExchangeRateChange}
            className="input-field-dashboard"
          />
          <label className="label-input-dashboard">
            Tasa de cambio en dólares
          </label>
        </div>
      </div>

      {confirmOpenCashRegister && (
        <div className="section-cash-closing">
          <div>Apertura de caja exitosa hoy {closingTime}</div>
        </div>
      )}

      {selectedSubOffice && (
        <div className="container-table">
          <div className="tbl-container">
            <table className="tbl-cash">
              <thead>
                <tr>
                  <th>Moneda/Cuenta</th>
                  <th>Código</th>
                  <th>Stock</th>
                  <th>Tasa de cambio</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4}>
                      <div className="spinner-container">
                        <Spinner />
                      </div>
                    </td>
                  </tr>
                ) : (
                  monedasLocales.map((currency) => (
                    <tr key={currency._id}>
                      <td>{currency.currency?.name || "No disponible"}</td>
                      <td>{currency.currency?.code || "No disponible"}</td>
                      <td>
                        {editingId === currency.currency._id &&
                        editingField === "stock" ? (
                          <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => handleEditEnd(currency)}
                            onKeyDown={(e) => handleKeyDown(e, currency)}
                            autoFocus
                            style={{
                              border: "1px solid #555",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          <span
                            onClick={() => handleEditStart(currency, "stock")}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            {currency.stock}
                            <img
                              src={imgPencil}
                              alt="Edit"
                              style={{
                                marginLeft: "5px",
                                width: "16px",
                                height: "16px",
                              }}
                            />
                          </span>
                        )}
                      </td>
                      <td>
                        {editingId === currency.currency._id &&
                        editingField === "exchangeRate" ? (
                          <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => handleEditEnd(currency)}
                            onKeyDown={(e) => handleKeyDown(e, currency)}
                            autoFocus
                            style={{
                              border: "1px solid #555",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          <span
                            onClick={() =>
                              handleEditStart(currency, "exchangeRate")
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            {currency.exchangeRate}
                            <img
                              src={imgPencil}
                              alt="Edit"
                              style={{
                                marginLeft: "5px",
                                width: "16px",
                                height: "16px",
                              }}
                            />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <h3>Total en USD:</h3>
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
          {totalDolarizado.toFixed(2)}
        </span>
      </div>
      <hr />

      <div className="agregar-moneda">
        <button onClick={handleOpenModal} className="btn-search-users">
          Crear moneda
        </button>
        <span
          style={{
            display: "flex",
            color: "#06571F",
            cursor: "pointer",
            whiteSpace: "nowrap",
            alignItems: "center",
          }}
          onClick={toggleCurrenciesVisibility}
        >
          {showCurrencies ? "Ocultar monedas" : "Ver monedas"}{" "}
          <img
            src={arrowDown}
            alt=""
            style={{
              transform: showCurrencies ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </span>
        <ModalCreateCurrency isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>

      {showCurrencies && (
        <div className="container-table">
          <table className="tbl-cash">
            <thead>
              <tr>
                <th>Moneda/Cuenta</th>
                <th>Código</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency) => (
                <tr key={currency._id}>
                  <td>{currency.name}</td>
                  <td>{currency.code}</td>
                  <td>
                    <button
                      className="btn-trash"
                      onClick={() => handleDeleteCurrency(currency._id)}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CashRegisterOpen;
