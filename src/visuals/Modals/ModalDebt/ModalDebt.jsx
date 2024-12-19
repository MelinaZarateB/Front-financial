import "./ModalDebt.css";
import { useState } from "react";

const ModalDebt = ({ isOpen, onClose, onSubmit, clientId }) => {
  console.log("modal deuda", clientId);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState(""); // Estado para la moneda seleccionada

  const handleSubmit = () => {
    onSubmit(amount, description, currency);
    setAmount("");
    setDescription("");
    setCurrency("");
  };

  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="h2-modal">Agregar Deuda</h2>
        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            name="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Monto
          </label>
        </div>
        {/*
        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Descripción
          </label>
        </div>
        */}
        {/* 
        
        <div className="input-box-dashboard">
          <div className={`select-container ${currency ? "has-value" : ""}`}>
            <select
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="input-field-dashboard select"
              style={{
                color: currency ? "#000" : "#555",
                cursor: "pointer",
              }}
            >
              <option value="all">Seleccione moneda</option>
              <option value="USD">USD - Dólar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="ARS">ARS - Peso Argentino</option>
            </select>
            <div
              className="floating-label"
              style={{ backgroundColor: "rgba(255, 255, 255)" }}
            >
              Moneda
            </div>
          </div>
        </div>
        */}

        <div
          className="buttons-container"
          style={{ display: "flex", gap: "5px", justifyContent: "end" }}
        >
          <button className="btn-search-users" onClick={handleSubmit}>
            Confirmar{" "}
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
          <button className="btn-search-users" onClick={onClose}>
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
      </div>
    </div>
  );
};
export default ModalDebt;
