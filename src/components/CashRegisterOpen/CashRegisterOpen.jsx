import React, { useEffect, useState } from "react";
import "./CashRegisterOpen.css";
import ModalCreateCurrency from "@/visuals/Modals/ModalCreateCurrency/ModalCreateCurrency";
import arrowDown from "./../../assets/arrow-down.svg";
import {
  getCurrencies,
  deleteCurrency,
  openCashRegister,
} from "@/redux/actions/cashRegisterActions";
import { getSubOffices } from "../../redux/actions/subOfficesActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/utils/Spinner/Spinner";
import Swal from "sweetalert2";
import imgPencil from './../../assets/pencil.svg';

const CashRegisterOpen = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [closingTime, setClosingTime] = useState(null);
  const [monedasLocales, setMonedasLocales] = useState([]);
  const [selectedSubOffice, setSelectedSubOffice] = useState("");
  const [totalDolarizado, setTotalDolarizado] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [updates, setUpdates] = useState([]);

  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.offices.currencies);
  const subOffices = useSelector((state) => state.offices.subOffices);
  const confirmOpenCashRegister = useSelector((state) => state.cashRegister.openCashRegister);

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch(getSubOffices());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubOffice) {
      setIsLoading(true);
      const office = subOffices.find((office) => office._id === selectedSubOffice);
      if (office) {
        const updatedCurrencies = office.currencies.map((c) => ({
          ...c,
          operation: "divide",
          exchangeRate: c.currency.exchangeRate,
          stock: c.stock || 0,
        }));
        setMonedasLocales(updatedCurrencies);
        calcularTotalDolarizado(updatedCurrencies);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [selectedSubOffice, subOffices]);

  const calcularTotalDolarizado = (currencies = monedasLocales) => {
    const total = currencies.reduce((acc, currency) => {
      return acc + calcularValorEnDolares(currency);
    }, 0);
    setTotalDolarizado(total);
  };

  const calcularValorEnDolares = (currency) => {
    let valor;
    if (currency.operation === "multiply") {
      valor = currency.stock * currency.exchangeRate;
    } else {
      valor = currency.stock / currency.exchangeRate;
    }
    return isNaN(valor) ? 0 : valor;
  };

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

  const toggleOperation = (currencyId) => {
    const actualizado = monedasLocales.map((currency) =>
      currency._id === currencyId
        ? {
            ...currency,
            operation: currency.operation === "multiply" ? "divide" : "multiply",
          }
        : currency
    );
    setMonedasLocales(actualizado);
    calcularTotalDolarizado(actualizado);
  };

  const handleDeleteCurrency = (idCurrency) => {
    dispatch(deleteCurrency(idCurrency));
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
        handleCloseRegister();
      }
    });
  };

  const handleCloseRegister = () => {
    const now = new Date();
    setClosingTime(now.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }));
  };

  const handleEditStart = (currency) => {
    setEditingId(currency._id);
    setEditValue(currency.exchangeRate.toString());
  };

  const handleEditEnd = (currency) => {
    setEditingId(null);
    if (editValue !== currency.exchangeRate.toString()) {
      const newAmount = parseFloat(editValue);
      
      setUpdates(prevUpdates => {
        const existingUpdateIndex = prevUpdates.findIndex(update => update.currencyId === currency._id);
        
        if (existingUpdateIndex !== -1) {
          const newUpdates = [...prevUpdates];
          newUpdates[existingUpdateIndex].amount = newAmount;
          return newUpdates;
        } else {
          return [...prevUpdates, { currencyId: currency._id, amount: newAmount }];
        }
      });

      actualizarTasaAplicada(currency._id, editValue);
    }
  };

  const handleKeyDown = (e, currency) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEditEnd(currency);
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
                  <th>Operación</th>
                  <th>Valor en USD</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6}>
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
                        <input
                          style={{
                            border: "1px solid #555",
                            borderRadius: "4px",
                          }}
                          type="text"
                          value={currency.stock}
                          onChange={(e) => actualizarStock(currency._id, e.target.value)}
                        />
                      </td>
                      <td>
                        {editingId === currency._id ? (
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
                            onClick={() => handleEditStart(currency)}
                            style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                          >
                            {currency.exchangeRate}
                            <img src={imgPencil} alt="Edit" style={{marginLeft: '5px', width: '16px', height: '16px'}} />
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => toggleOperation(currency._id)}
                          style={{
                            padding: "5px 10px",
                            borderRadius: "4px",
                            border: "none",
                            background: currency.operation === "multiply" ? "#4CAF50" : "#f44336",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          {currency.operation === "multiply" ? "x" : "÷"}
                        </button>
                      </td>
                      <td>
                        {calcularValorEnDolares(currency).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="total" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <pre>{JSON.stringify(updates, null, 2)}</pre>
    </div>
  );
};

export default CashRegisterOpen;