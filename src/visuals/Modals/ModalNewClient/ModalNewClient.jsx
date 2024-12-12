import { useState } from "react";
import './ModalNewClient.css';

const ModalNewClient = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState(""); // Estado para la moneda seleccionada

  const [newClient, setNewClient] = useState({
    name: '',
    lastname: '',
    phone: '',
    mail: '',
    money: 0,
    totalDebts: 0,
    totalPayments: 0,
    transactions: [],
    movements: [],
    observations: [],
  })

  const handleClients = (e) => {
    [e.target.name] = e.target.value;
  }

  const handleSubmit = () => {
    onSubmit(amount, description, currency);
    setAmount("");
    setDescription("");
    setCurrency(""); // Restablecer la moneda a USD al enviar
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="h2-modal">Crear nuevo cliente</h2>
        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            type="text"
            value={amount}
            name="name"
            onChange={handleClients}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Nombre
          </label>
        </div>
        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            type="text"
            value={description}
            name="lastname"
            onChange={handleClients}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Apellido
          </label>
        </div>
        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            type="text"
            name="phone"
            value={description}
            onChange={handleClients}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Telefono
          </label>
        </div>
        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            type="text"
            name="mail"
            value={description}
            onChange={handleClients}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Email
          </label>
        </div>
        <div
          className="buttons-container"
          style={{ display: "flex", gap: "5px", justifyContent: "end" }}
        >
          <button className="btn-search-users" onClick={handleSubmit}>
             Crear{" "}
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
export default ModalNewClient;
