import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCurrencies } from "@/redux/actions";
import SpinnerSmall from './../../../utils/Spinner/SpinnerSmall';

const ModalCreateCurrency = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createCurrency, setCreateCurrency] = useState({
    name: "",
    code: "",
    exchangeRate: "",
  });
  console.log(createCurrency.name);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateCurrency({
      ...createCurrency,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Cambia a 'true' cuando comience el envío
    try {
      await dispatch(createCurrencies(createCurrency));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false); // Cambia de nuevo a 'false' cuando termine el envío
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="h2-modal">Crear nueva moneda</h2>

        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            type="text"
            name="name"
            value={createCurrency.name}
            onChange={handleInputChange}
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
            name="code"
            value={createCurrency.code}
            onChange={handleInputChange}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Código
          </label>
        </div>

        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            type="text"
            name="exchangeRate"
            value={createCurrency.exchangeRate}
            onChange={handleInputChange}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Tipo de cambio
          </label>
        </div>

        <div
          className="buttons-container"
          style={{ display: "flex", gap: "5px", justifyContent: "end" }}
        >
          <div>
          <button className="btn-submit-create-user" onClick={handleSubmit}>
          <label htmlFor="submit" className="label" >
              {" "}
              {isSubmitting ? <SpinnerSmall /> : "Crear"}
            </label>
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
          </div>
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

export default ModalCreateCurrency;
