import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSubOffices } from "@/redux/actions/subOfficesActions";

const ModalCreateSuboffice = ({ isOpen, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    address: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    dispatch(createSubOffices(formData));
    setFormData({
      name: "",
      code: "",
      address: "",
      phone: ""
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="h2-modal">Registrar suboficina</h2>
        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.code}
            onChange={handleInputChange}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Codigo
          </label>
        </div>
        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Dirección
          </label>
        </div>
        <div className="input-box-dashboard">
          <input
            className="input-field-dashboard"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <label
            className="label-input-dashboard"
            style={{ backgroundColor: "rgba(255, 255, 255)" }}
          >
            Telefono
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

export default ModalCreateSuboffice;
