import { useEffect, useState } from "react";
import "./CashRegisterOpen.css";
import ModalCreateCurrency from "@/visuals/Modals/ModalCreateCurrency/ModalCreateCurrency";
import arrowDown from "./../../assets/arrow-down.svg";
import { getCurrencies, deleteCurrency, getSubOffices } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/utils/Spinner/Spinner";

const CashRegisterOpen = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currencies = useSelector((state) => state.currencies);
  const subOffices = useSelector((state) => state.subOffices);
  const dispatch = useDispatch();

  const [selectedSubOffice, setSelectedSubOffice] = useState('');
  const [tasas, setTasas] = useState({
    USD: 1000,
    EUR: 1100,
  });
  const [tasaEURUSD, setTasaEURUSD] = useState(1.1);
  const [tasaActual, setTasaActual] = useState("USD");
  const [monedaBase, setMonedaBase] = useState("USD");
  const [totalDolarizado, setTotalDolarizado] = useState(0);

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch(getSubOffices());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubOffice) {
      setIsLoading(true);
      const office = subOffices.find(office => office._id === selectedSubOffice);
      if (office) {
        calcularTotalDolarizado(office.currencies);
      }
      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [selectedSubOffice, subOffices, tasas, tasaEURUSD, monedaBase]);

  const handleDeleteCurrency = (idCurrency) => {
    dispatch(deleteCurrency(idCurrency));
  };

  const actualizarStock = (currencyId, nuevoStock) => {
    console.log(`Updating stock for currency ${currencyId} to ${nuevoStock}`);
  };

  const calcularTotalDolarizado = (currencies) => {
    const total = currencies.reduce((acc, currency) => {
      return acc + calcularValorEnDolares(currency);
    }, 0);
    setTotalDolarizado(total);
  };

  const calcularValorEnDolares = (currency) => {
    if (currency.currency.code === "USD") return currency.stock;
    if (currency.currency.code === "ARS") return currency.stock / tasas.USD;
    if (currency.currency.code === "EUR") return currency.stock * tasaEURUSD;
    return currency.stock * (tasas.USD / tasas[currency.currency.code]);
  };

  const calcularValorEquivalente = (currency) => {
    const valorEnDolares = calcularValorEnDolares(currency);
    if (monedaBase === "USD") return valorEnDolares;
    if (monedaBase === "EUR") return valorEnDolares / tasaEURUSD;
    return valorEnDolares;
  };

  const obtenerTasaAplicada = (currency) => {
    if (currency.currency.code === monedaBase) return "1.0000";
    if (currency.currency.code === "ARS") return tasas[monedaBase].toFixed(4);
    if (currency.currency.code === "USD" && monedaBase === "EUR")
      return (1 / tasaEURUSD).toFixed(4);
    if (currency.currency.code === "EUR" && monedaBase === "USD")
      return tasaEURUSD.toFixed(4);
    return (tasas[monedaBase] / tasas[currency.currency.code]).toFixed(4);
  };

  const actualizarTasa = (nuevaTasa) => {
    setTasas((prev) => ({ ...prev, [tasaActual]: parseFloat(nuevaTasa) || 0 }));
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const toggleCurrenciesVisibility = () => {
    setShowCurrencies(!showCurrencies);
  };

  return (
    <div className="section-cash-opening">
      <div className="container-btn-cash-close">
        <button className="btn-close-cash">Abrir caja</button>
      </div>

      <div className="input-group">
        <div className="input-box-dashboard">
          <select
            value={selectedSubOffice}
            onChange={(e) => setSelectedSubOffice(e.target.value)}
            className="input-field-dashboard"
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

        <div className="input-box-dashboard">
          <input
            type="text"
            value={tasas[tasaActual]}
            onChange={(e) => actualizarTasa(e.target.value)}
            className="input-field-dashboard"
          />
          <label className="label-input-dashboard">
            Tasa de cambio ARS/USD
          </label>
        </div>

        <div className="input-box-dashboard">
          <input
            type="text"
            value={tasaEURUSD}
            className="input-field-dashboard"
            onChange={(e) => setTasaEURUSD(parseFloat(e.target.value) || 0)}
          />
          <label className="label-input-dashboard">Tasa EUR/USD:</label>
        </div>
      </div>

      {selectedSubOffice && (
        <div className="container-table">
          {isLoading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : (
            <div className="tbl-container">
              <table className="tbl-cash">
                <thead>
                  <tr>
                    <th>Moneda/Cuenta</th>
                    <th>Código</th>
                    <th>Stock</th>
                    <th>Valor en {monedaBase}</th>
                    <th>Tasa Aplicada</th>
                  </tr>
                </thead>
                <tbody>
                  {subOffices
                    .find((office) => office._id === selectedSubOffice)
                    ?.currencies.map((currency) => (
                      <tr key={currency._id}>
                        <td>{currency.currency.name}</td>
                        <td>{currency.currency.code}</td>
                        <td>
                          <input
                            style={{
                              border: "1px solid #555",
                              borderRadius: "4px",
                            }}
                            type="text"
                            value={currency.stock}
                            onChange={(e) =>
                              actualizarStock(currency._id, e.target.value)
                            }
                          />
                        </td>
                        <td>{calcularValorEquivalente(currency).toFixed(2)}</td>
                        <td>{obtenerTasaAplicada(currency)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="total">
        <h3>
          Total en {monedaBase}: {totalDolarizado.toFixed(2)}
        </h3>
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
    </div>
  );
};

export default CashRegisterOpen;