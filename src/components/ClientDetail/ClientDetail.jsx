import "./ClientDetail.css";
import { useState } from "react";

const ClientDetail = ({onGoBack}) => {
  const [activeTab, setActiveTab] = useState("transacciones");
  return (
    <section className="container-client-detail">
      <div className="buttons-container">
        
       <button className="btn-search-users" onClick={onGoBack} >
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
      <h2>Detalle del Cliente: </h2>
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
          className={`tab ${activeTab === "observaciones" ? "active" : ""}`}
          onClick={() => setActiveTab("observaciones")}
          aria-selected={activeTab === "observaciones"}
          aria-controls="observaciones-content"
        >
          Observaciones
        </button>
      </div>
    </section>
  );
};
export default ClientDetail;
