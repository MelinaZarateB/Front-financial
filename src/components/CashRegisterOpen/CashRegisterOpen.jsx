import { useEffect, useState } from "react";
import "./CashRegisterOpen.css";
import ModalCreateCurrency from "@/visuals/Modals/ModalCreateCurrency/ModalCreateCurrency";
import arrowDown from "./../../assets/arrow-down.svg";

const CashRegisterOpen = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [monedas, setMonedas] = useState([
    { nombre: "Peso Argentino", codigo: "ARS", stock: 0 },
    { nombre: "Dólar Estadounidense", codigo: "USD", stock: 0 },
    { nombre: "Euro", codigo: "EUR", stock: 0 },
    { nombre: "MP Manu", codigo: "ARS", stock: 0 },
    { nombre: "Cheques", codigo: "ARS", stock: 0 },
    { nombre: "Juancho", codigo: "ARS", stock: 0 },
    { nombre: "Cara chica", codigo: "USD", stock: 0 },
  ]);
  const [tasas, setTasas] = useState({
    USD: 1000, // Tasa de cambio ARS/USD
    EUR: 1100, // Tasa de cambio ARS/EUR
  });
  const [tasaEURUSD, setTasaEURUSD] = useState(1.1); // Nuevo estado para la tasa EUR/USD
  const [tasaActual, setTasaActual] = useState("USD");
  const [monedaBase, setMonedaBase] = useState("USD");
  const [totalDolarizado, setTotalDolarizado] = useState(0);
  const [nuevaMoneda, setNuevaMoneda] = useState({ nombre: "", codigo: "" });

  useEffect(() => {
    calcularTotalDolarizado();
  }, [monedas, tasas, tasaEURUSD, monedaBase]);

  const actualizarStock = (index, nuevoStock) => {
    const nuevasMonedas = [...monedas];
    nuevasMonedas[index].stock = parseFloat(nuevoStock) || 0;
    setMonedas(nuevasMonedas);
  };

  const calcularTotalDolarizado = () => {
    const total = monedas.reduce((acc, moneda) => {
      return acc + calcularValorEnDolares(moneda);
    }, 0);
    setTotalDolarizado(total);
  };

  const agregarMoneda = () => {
    if (nuevaMoneda.nombre && nuevaMoneda.codigo) {
      setMonedas([...monedas, { ...nuevaMoneda, stock: 0 }]);
      setNuevaMoneda({ nombre: "", codigo: "" });
    }
  };

  const calcularValorEnDolares = (moneda) => {
    if (moneda.codigo === "USD") return moneda.stock;
    if (moneda.codigo === "ARS") return moneda.stock / tasas.USD;
    if (moneda.codigo === "EUR") return moneda.stock * tasaEURUSD;
    return moneda.stock * (tasas.USD / tasas[moneda.codigo]);
  };

  const calcularValorEquivalente = (moneda) => {
    const valorEnDolares = calcularValorEnDolares(moneda);
    if (monedaBase === "USD") return valorEnDolares;
    if (monedaBase === "EUR") return valorEnDolares / tasaEURUSD;
    return valorEnDolares;
  };

  const obtenerTasaAplicada = (moneda) => {
    if (moneda.codigo === monedaBase) return "1.0000";
    if (moneda.codigo === "ARS") return tasas[monedaBase].toFixed(4);
    if (moneda.codigo === "USD" && monedaBase === "EUR")
      return (1 / tasaEURUSD).toFixed(4);
    if (moneda.codigo === "EUR" && monedaBase === "USD")
      return tasaEURUSD.toFixed(4);
    return (tasas[monedaBase] / tasas[moneda.codigo]).toFixed(4);
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

  return (
    <div className="section-cash-opening">
      <div className="container-btn-cash-close">
        <button className="btn-close-cash">Abrir caja</button>
      </div>
      <div className="input-group">
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

      {/* Tabla comienza aca */}
      <div className="container-table">
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
              {monedas.map((moneda, index) => (
                <tr key={moneda.codigo}>
                  <td>{moneda.nombre}</td>
                  <td>{moneda.codigo}</td>
                  <td>
                    <input
                      style={{
                        border: "1px solid #555",
                        borderRadius: "4px",
                      }}
                      type="text"
                      value={moneda.stock}
                      onChange={(e) => actualizarStock(index, e.target.value)}
                    />
                  </td>
                  <td>{calcularValorEquivalente(moneda).toFixed(2)}</td>
                  <td>{obtenerTasaAplicada(moneda)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="total">
        <h3>
          Total en {monedaBase}: {totalDolarizado.toFixed(2)}
        </h3>
      </div>
      <div className="agregar-moneda">
        <button onClick={handleOpenModal} className="btn-search-users">
          Crear moneda
        </button>
        <span
          style={{
            display: "flex",
            color: "#06571F",
            cursor: "pointer",
            whiteSpace: 'nowrap',
            alignItems: 'center'
          }}
        >
          Ver monedas <img src={arrowDown} alt="" />
        </span>
        <ModalCreateCurrency isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default CashRegisterOpen;
