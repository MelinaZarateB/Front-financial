import "./Offices.css";
import { useState } from "react";
import plusIcon from "./../../assets/plus.svg";
import officeIcon from "./../../assets/office.svg";
import usersIcon from "./../../assets/usersOffices.svg";
import currencyIcon from './../../assets/currency.svg';
import ModalCreateUser from "@/visuals/Modals/ModalCreateUser/ModalCreateUser";
import ModalCreateCurrency from "@/visuals/Modals/ModalCreateCurrency/ModalCreateCurrency";
import ModalCreateSuboffice from "@/visuals/Modals/ModalCreateSuboffice/ModalCreateSuboffice";


const Offices = () => {
  const [viewForm, setViewForm] = useState(false);
  const [selectType, setSelectType] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [newOffice, setNewOffice] = useState({
    name: "",
    address: "",
    sub_offices: [],
    globalStock: "",
  });
  const changeForm = () => {
    if (viewForm === false) setViewForm(true);
    else {
      setViewForm(false);
    }
  };
  const handleChangeNewUser = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleOpenModal = () => {
    setModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cierra el modal
  };

  return (
    <div className="container-users">
      <div>
        <button
          className="btn-create-user"
          onClick={changeForm}
          style={{
            borderBottomLeftRadius: viewForm ? "0px" : "4px",
            borderBottomRightRadius: viewForm ? "0px" : "4px",
          }}
        >
          Registrar sucursal
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#06571f"
            style={{
              transform: viewForm ? "rotate(-90deg)" : "",
              transition: "all 0.2s ease-in-out",
            }}
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </button>

        <div className={`form-container ${viewForm ? "open" : ""}`}>
          <form
            action=""
            className="form-dashboard"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-columns">
              <div className="inputs-column">
                <div className="input-box-dashboard">
                  <input
                    type="text"
                    className="input-field-dashboard"
                    name="name"
                    value={newOffice.name}
                    onChange={handleChangeNewUser}
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
                    type="text"
                    className="input-field-dashboard"
                    name="address"
                    value={newOffice.address}
                    onChange={handleChangeNewUser}
                  />
                  <label
                    className="label-input-dashboard"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Domicilio
                  </label>
                </div>
                <div className="input-box-dashboard">
                  <input
                    type="text"
                    className="input-field-dashboard"
                    name="globalStock"
                    value={newOffice.globalStock}
                    onChange={handleChangeNewUser}
                  />
                  <label
                    className="label-input-dashboard"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Stock Global
                  </label>
                </div>
              </div>
            </div>

            <div
              className="buttons-container"
              style={{ display: "flex", gap: "5px", justifyContent: "end" }}
            >
              <button className="btn-search-users">
                Registrar{" "}
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
              <button className="btn-search-users" onClick={changeForm}>
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
          </form>
        </div>
      </div>

      <div className="container-parent-offices">
        <h2 className="title-offices">Casa Central</h2>
        <strong>Dirección:</strong> {''}
        <span>Cordoba 1422</span>
        <div>
          <div className="section-title-svg">
            <img src={officeIcon} alt="" />
            <h4>Suboficinas</h4>
          </div>
          <div className="container-parent-suboffices">
            <div>
              <h5 style={{fontWeight: '600'}}>Sucursal 1</h5>
              <p>Dirección: Arenales 2322</p>
            </div>

            {/* Seccion usuarios */}
            <div>
              <div className="section-title-svg" >
                <img src={usersIcon} alt="" />
                <h4>Usuarios </h4>
              </div>
              <div className="input-box-dashboard">
                <div
                  className={`select-container ${
                    selectType ? "has-value" : ""
                  }`}
                >
                  <select
                    name="typeExpense"
                    className="input-field-dashboard select"
                    style={{
                      color: selectType ? "#000" : "#555",
                      cursor: "pointer",
                    }}
                  >
                    <option value="all">Seleccionar usuario</option>
                  </select>
                  <div
                    className="floating-label"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Usuarios
                  </div>
                </div>
                <div className="container-buttons-offices">
                  <button className="btn-offices">Agregar usuario</button>
                  <button className="btn-offices" onClick={handleOpenModal}>Crear nuevo usuario</button>
                </div>
              </div>
            </div>
            <ModalCreateUser isOpen={isModalOpen} onClose={handleCloseModal} />

            {/* Seccion monedas */}
            <div>
              <div className="section-title-svg">
                <img src={currencyIcon} alt="" />
                <h4>Monedas</h4>
              </div>
              <div className="input-box-dashboard">
                <div
                  className={`select-container ${
                    selectType ? "has-value" : ""
                  }`}
                >
                  <select
                    name="typeExpense"
                    className="input-field-dashboard select"
                    style={{
                      color: selectType ? "#000" : "#555",
                      cursor: "pointer",
                    }}
                  >
                    <option value="all">Seleccionar moneda</option>
                  </select>
                  <div
                    className="floating-label"
                    style={{ backgroundColor: "rgba(255, 255, 255)" }}
                  >
                    Monedas
                  </div>
                </div>
              </div>

              <div className="container-buttons-offices">
                <button className="btn-offices">Agregar moneda</button>
                <button className="btn-offices" onClick={handleOpenModal}>Crear nueva moneda</button>
              </div>
              <ModalCreateCurrency isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
          </div>
        </div>
        <div style={{marginTop: '1rem'}}>
          <button className="btn-offices" >
            {" "}
            <span>Registrar suboficina</span> <img src={plusIcon} alt="" />
          </button>
        </div>
       
      </div>
    </div>
  );
};
export default Offices;
