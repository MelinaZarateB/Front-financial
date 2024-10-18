import { useEffect, useState } from "react";
import "./CajaApertura.css";

const CajaApertura = () => {
  const [monedas, setMonedas] = useState([
    { nombre: "Peso Argentino", codigo: "ARS", stock: 0 },
    { nombre: "Dólar Estadounidense", codigo: "USD", stock: 0 },
    { nombre: "Euro", codigo: "EUR", stock: 0 },
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

  return (
    <div className="section-cash-opening">
      <div className="formulario">
        <div className="campo">
          <div className="input-group">
            <div className="input-box-dashboard">
              <input
                type="text"
                value={tasas[tasaActual]}
                onChange={(e) => actualizarTasa(e.target.value)}
                className="input-field-dashboard"
              />
              <label className="label-input-dashboard">
                Tasa de cambio ARS/
              </label>
            </div>
            <select
              value={tasaActual}
              onChange={(e) => setTasaActual(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
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
      <div className="container-table">
        <div className="tbl-container">
          <table className="tbl-cash">
            <thead>
              <tr>
                <th>Moneda</th>
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
        <div className="input-box-dashboard">
        <input
          value={nuevaMoneda.nombre}
          className="input-field-dashboard"
          onChange={(e) =>
            setNuevaMoneda({ ...nuevaMoneda, nombre: e.target.value })
          }
        />
        <label htmlFor="" className="label-input-dashboard">Nombre de la moneda</label>
        </div>
        <div className="input-box-dashboard">
        <input
          
          value={nuevaMoneda.codigo}
          className="input-field-dashboard"
          onChange={(e) =>
            setNuevaMoneda({
              ...nuevaMoneda,
              codigo: e.target.value.toUpperCase(),
            })
          }
        />
        <label htmlFor="" className="label-input-dashboard">Código de la moneda</label>
        </div>
        <button onClick={agregarMoneda} className="btn-search-users">Agregar Moneda</button>
      </div>
    </div>
  );
};

export default CajaApertura;
