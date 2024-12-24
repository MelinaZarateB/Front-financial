import "./ClientDetail.css";
import { useState } from "react";
import ClientTransactions from "../ClientsTransaction/ClientTransactions";
import ClientMovements from "../ClientMovements/ClientMovements";
import ClientObservations from "../ClientObservations/ClientObservations";

const ClientDetail = ({ onGoBack, selectedClient}) => {
  const { id, name, lastname, transactions, movements, observations } = selectedClient;
  console.log('MOVIMIENTOS DEL DETALLE DE CLIENTES',selectedClient.movements)
  const [activeTab, setActiveTab] = useState("transacciones"); // El valor inicial es 'transacciones'

  return (
    <section className="container-client-detail">
      <div className="buttons-container">
        <button className="btn-search-users" onClick={onGoBack}>
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
      <h2>Historial del Cliente: <strong>{name} {lastname}</strong></h2>
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <div className="tablist">
        <button
          className={`tab ${activeTab === "transacciones" ? "active" : ""}`}
          onClick={() => setActiveTab("transacciones")}
          aria-selected={activeTab === "transacciones"}
          aria-controls="transacciones-content"
        >
          Transacciones
        </button>
        <button
          className={`tab ${activeTab === "movimientos" ? "active" : ""}`}
          onClick={() => setActiveTab("movimientos")}
          aria-selected={activeTab === "movimientos"}
          aria-controls="movimientos-content"
        >
          Movimientos
        </button>
        <button
          className={`tab ${activeTab === "observaciones" ? "active" : ""}`}
          onClick={() => setActiveTab("observaciones")}
          aria-selected={activeTab === "observaciones"}
          aria-controls="observaciones-content"
        >
          Observaciones
        </button>
      {/* Renderizado condicional de los componentes según la pestaña activa */}
      </div>
      <div className="tab-content">
        {activeTab === "transacciones" && <ClientTransactions transactions={transactions} id={id}/>}
        {activeTab === "movimientos" && <ClientMovements movements={movements}/>}
        {activeTab === "observaciones" && <ClientObservations observations={observations} id={id}/>}
      </div>
      </div>

    </section>
  );
};

export default ClientDetail;
