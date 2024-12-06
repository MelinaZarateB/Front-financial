import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import plusIcon from "./../../assets/plus.svg";
import officeIcon from "./../../assets/office.svg";
import usersIcon from "./../../assets/usersOffices.svg";
import currencyIcon from "./../../assets/currency.svg";
import arrowDown from "./../../assets/arrow-down.svg";
import ModalCreateUser from "@/visuals/Modals/ModalCreateUser/ModalCreateUser";
import ModalCreateCurrency from "@/visuals/Modals/ModalCreateCurrency/ModalCreateCurrency";
import ModalCreateSuboffice from "@/visuals/Modals/ModalCreateSuboffice/ModalCreateSuboffice";
import {
  getSubOffices,
  getCurrencies,
  deleteCurrencySubOffice,
  updateStockCurrency,
} from "../../redux/actions/subOfficesActions";
import "./Offices.css";

const Offices = () => {
  const dispatch = useDispatch();
  const subOffices = useSelector((state) => state.offices.subOffices);
  console.log(subOffices)
  const currencies = useSelector((state) => state.offices.currencies);
  const updaCurrency = useSelector(
    (state) => state.offices._idupdateCurrencies
  );
  const [selectedCurrencyId, setSelectedCurrencyId] = useState("");
  const [viewForm, setViewForm] = useState(false);
  const [selectType, setSelectType] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [newOffice, setNewOffice] = useState({
    name: "",
    address: "",
    sub_offices: [],
    globalStock: "",
  });
  const [visibleCurrencies, setVisibleCurrencies] = useState({});

  const changeForm = () => {
    setViewForm(!viewForm);
  };

  const handleChangeNewUser = (event) => {
    setNewOffice({
      ...newOffice,
      [event.target.name]: event.target.value,
    });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleDeleteCurrency = (idCurrency, idOffice) => {
    dispatch(deleteCurrencySubOffice(idCurrency, idOffice));
  };
  const handleSelectChange = (e) => {
    setSelectedCurrencyId(e.target.value);
  };

  const handleUpdateStockCurrency = (idCurrency, idOffice) => {
    dispatch(updateStockCurrency(idCurrency, idOffice)) &&
      setSelectedCurrencyId("");
  };
  const toggleCurrencyVisibility = (officeId) => {
    setVisibleCurrencies((prev) => ({
      ...prev,
      [officeId]: !prev[officeId],
    }));
  };

  useEffect(() => {
    dispatch(getSubOffices());
    dispatch(getCurrencies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubOffices());
  }, [updaCurrency]);

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
        <strong>Dirección:</strong> {""}
        <span>Cordoba 1422</span>
        <div>
          <div className="section-title-svg">
            <img src={officeIcon} alt="" />
            <h4>Suboficinas</h4>
          </div>
          {subOffices?.map((office) => (
            <div key={office._id} className="container-parent-suboffices">
              <div>
                <h5 style={{ fontWeight: "600" }}>{office.name}</h5>
                <p>Dirección: {office.address}</p>
              </div>

              <section className="section-users-currency">
                {/* Seccion usuarios */}
                <div>
                  <div className="section-title-svg">
                    <img src={usersIcon} alt="" />
                    <h4>Usuarios </h4>
                  </div>
                  <section
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
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
                          {office.users.map((user) => (
                            <option key={user._id} value={user.name}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                        <div
                          className="floating-label"
                          style={{ backgroundColor: "rgba(255, 255, 255)" }}
                        >
                          Usuarios
                        </div>
                      </div>
                    </div>
                    <div className="container-buttons-offices">
                      <button className="btn-search-users">
                        Agregar usuario
                      </button>
                    </div>
                  </section>
                  <span
                    style={{
                      display: "flex",
                      color: "#06571F",
                      cursor: "pointer",
                    }}
                  >
                    Ver usuarios de la sucursal <img src={arrowDown} alt="" />
                  </span>
                </div>

                {/* Seccion monedas */}
                <div>
                  <div className="section-title-svg">
                    <img src={currencyIcon} alt="" />
                    <h4>Monedas</h4>
                  </div>
                  <section
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div className="input-box-dashboard">
                      <div
                        className={`select-container ${
                          selectType ? "has-value" : ""
                        }`}
                      >
                        <select
                          name="currency"
                          value={selectedCurrencyId}
                          className="input-field-dashboard select"
                          onChange={handleSelectChange}
                          style={{
                            color: selectType ? "#000" : "#555",
                            cursor: "pointer",
                          }}
                        >
                          <option value="all">Seleccionar moneda</option>
                          {currencies?.map((currency) => (
                            <option key={currency._id} value={currency._id}>
                              {currency.name} ({currency.code})
                            </option>
                          ))}
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
                      <button
                        className="btn-search-users"
                        onClick={() =>
                          handleUpdateStockCurrency(
                            selectedCurrencyId,
                            office._id
                          )
                        }
                      >
                        Agregar moneda
                      </button>
                    </div>
                  </section>
                  <span
                    style={{
                      display: "flex",
                      color: "#06571F",
                      cursor: "pointer",
                      borderBottom: "5px",
                      borderTop: "5px",
                    }}
                    onClick={() => toggleCurrencyVisibility(office._id)}
                  >
                    {visibleCurrencies[office._id]
                      ? "Ocultar monedas de la sucursal"
                      : "Ver monedas de la sucursal"}{" "}
                    <img
                      src={arrowDown}
                      alt=""
                      style={{
                        transform: visibleCurrencies[office._id]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </span>
                  <div
                    className={`container-table ${
                      visibleCurrencies[office._id] ? "visible" : ""
                    }`}
                    style={{
                      animation: visibleCurrencies[office._id]
                        ? "slideIn 0.2s forwards"
                        : "slideOut 0.2s forwards",
                      display: visibleCurrencies[office._id] ? "block" : "none",
                    }}
                  >
                    <div className="">
                      <table className="tbl-cash">
                        <thead>
                          <tr>
                            <th>Moneda/Cuenta</th>
                            <th>Código</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {office.currencies.map((currency) => (
                            <tr key={currency._id}>
                              <td>
                                {currency.currency?.name || "No disponible"}
                              </td>
                              <td>
                                {currency.currency?.code || "No disponible"}
                              </td>
                              <td>
                                {" "}
                                <button
                                  className="btn-trash"
                                  onClick={() =>
                                    handleDeleteCurrency(
                                      currency.currency._id,
                                      office._id
                                    )
                                  }
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button className="btn-search-users">
            {" "}
            <span>Registrar subsucursal</span> <img src={plusIcon} alt="" />
          </button>
        </div>
      </div>
      <ModalCreateCurrency isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Offices;
