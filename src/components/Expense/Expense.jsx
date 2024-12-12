import "./Expense.css";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../utils/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  createExpense,
  getExpenses,
  filterExpense,
  cleanFilter,
} from "@/redux/actions/expensesActions";
import { deleteMovement } from "@/redux/actions/movementsActions";
import SpinnerSmall from "./../../utils/Spinner/SpinnerSmall";

const typeExpenses = [
  "servicios públicos",
  "alquileres",
  "sueldos y salarios",
  "mantenimiento",
  "materiales e insumos",
  "publicidad y marketing",
  "transporte",
  "impuestos y tasas",
  "gastos administrativos",
  "seguros",
  "varios",
];

const Expense = () => {
  const dispatch = useDispatch();
  const subOffices = useSelector((state) => state.offices.subOffices);
  const createdExpense = useSelector((state) => state.expenses.createdExpense);
  const expenses = useSelector((state) => state.expenses.expenses);
  const expensesFiltered = useSelector(
    (state) => state.expenses.expensesFiltered
  );
  const deleteMovements = useSelector(
    (state) => state.movements.deleteMovement
  );
  //const [typeExpense, setTypeExpense] = useState("");
  const [subOfficeCurrencies, setSubOfficeCurrencies] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [viewForm, setViewForm] = useState(false);
  const [userRol, setUserRol] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newExpense, setNewExpense] = useState({
    type: "",
    description: "",
    amount: "",
    subOffice: "",
    currency: "",
    category: "egreso",
    user: "",
  });

  useEffect(() => {
    dispatch(getExpenses());
  }, [deleteMovements, createdExpense]);

  const [dataForm, setDataForm] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });

  const handleChangeNewExpense = (event) => {
    const { name, value } = event.target;
    setNewExpense((prevState) => ({
      ...prevState,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    }));
  };
  const handleChangeType = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "all") {
      setSelectType(""); // Restablecer el valor del select
    } else {
      setSelectType(selectedValue); // Establecer el valor seleccionado
    }
  };

  const changeForm = (event) => {
    event.preventDefault();
    if (viewForm === false) setViewForm(true);
    else {
      setViewForm(false);
    }
  };
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "subOffice") {
      const selectedOffice = subOffices.find((office) => office.name === value);
      if (selectedOffice) {
        setNewExpense({
          ...newExpense,
          subOffice: selectedOffice._id,
        });
        setSubOfficeCurrencies(
          selectedOffice.currencies.map((c) => c.currency)
        );
      } else {
        setNewExpense({
          ...newExpense,
          subOffice: "",
        });
        setSubOfficeCurrencies([]);
      }
    }
  };
  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setNewExpense((prevState) => ({
        ...prevState,
        user: userInfo._id,
      }));
      setUserRol(userInfo.role);
    }
  }, []);

  const handleNewExpense = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(createExpense(newExpense));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
    setNewExpense({
      type: "",
      description: "",
      amount: "",
      subOffice: "",
      currency: "",
      category: "egreso",
      user: newExpense.user,
    });
  };

  const handleDeleteMovement = (idMovement) => {
    dispatch(deleteMovement(idMovement));
  };
  const handleFilterType = () => {
    dispatch(filterExpense(selectType));
  };
  const handleCleanFilter = () => {
    dispatch(cleanFilter());
    setSelectType('');
  };

  // Calcular el total de los montos
  //const total = expensesArray.reduce((acc, expense) => acc + expense.monto, 0);

  return (
    <ThemeProvider theme={theme}>
      <section className="section-expense">
        <div>
          <button
            className="btn-create-user"
            onClick={changeForm}
            style={{
              borderBottomLeftRadius: viewForm ? "0px" : "4px",
              borderBottomRightRadius: viewForm ? "0px" : "4px",
            }}
          >
            Registrar egreso
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
                  <div
                    className={`select-container ${
                      newExpense.subOffice ? "has-value" : ""
                    }`}
                  >
                    <select
                      name="subOffice" // Este name debe coincidir con la propiedad en newTransaction
                      className="input-field-dashboard select"
                      style={{
                        color: newExpense.subOffice ? "#000" : "#555",
                        cursor: "pointer",
                      }}
                      value={newExpense.subOffice} // Asegura que esté sincronizado
                      onChange={handleSelectChange}
                    >
                      <option value="">Sucursal</option>
                      {subOffices.map((office) => (
                        <option key={office._id} value={office.name}>
                          {office.name}
                        </option>
                      ))}
                    </select>
                    <div
                      className="floating-label"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Sucursal
                    </div>
                  </div>

                  <div className="input-box-dashboard">
                    <div
                      className={`select-container ${
                        newExpense.type ? "has-value" : ""
                      }`}
                    >
                      <select
                        name="type"
                        className="input-field-dashboard select"
                        value={newExpense.type}
                        onChange={handleChangeNewExpense}
                        style={{
                          color: newExpense.type ? "#000" : "#555",
                          cursor: "pointer",
                        }}
                      >
                        <option value="all"> Tipo de egreso</option>
                        {typeExpenses?.map((typeExpense, index) => (
                          <option key={index} value={typeExpense}>
                            {typeExpense}
                          </option>
                        ))}
                      </select>
                      <div
                        className="floating-label"
                        style={{ backgroundColor: "rgba(255, 255, 255)" }}
                      >
                        Tipo de egreso
                      </div>
                    </div>
                  </div>
                  <div className="input-box-dashboard">
                    <input
                      type="text"
                      className="input-field-dashboard"
                      name="amount"
                      value={newExpense.amount}
                      onChange={handleChangeNewExpense}
                    />
                    <label
                      className="label-input-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Monto
                    </label>
                  </div>
                  <div className="input-box-dashboard">
                    <div
                      className={`select-container ${
                        newExpense.currency ? "has-value" : ""
                      }`}
                    >
                      <select
                        name="currency" // Este name debe coincidir con la propiedad en newTransaction
                        className="input-field-dashboard select"
                        style={{
                          color: newExpense.currency ? "#000" : "#555",
                          cursor: "pointer",
                        }}
                        value={newExpense.currency}
                        onChange={handleChangeNewExpense}
                      >
                        <option value="">Moneda</option>
                        {subOfficeCurrencies.map((currency) => (
                          <option
                            key={currency._id}
                            value={currency._id}
                          >{`${currency.name} - ${currency.code}`}</option>
                        ))}
                      </select>
                      <div
                        className="floating-label"
                        style={{ backgroundColor: "rgba(255, 255, 255)" }}
                      >
                        Moneda
                      </div>
                    </div>
                  </div>

                  <div className="textarea-box-dashboard">
                    <textarea
                      className="textarea-field-dashboard"
                      name="description"
                      value={newExpense.description}
                      placeholder=" "
                      onChange={handleChangeNewExpense}
                    ></textarea>
                    <label
                      className="label-textarea-dashboard"
                      style={{ backgroundColor: "rgba(255, 255, 255)" }}
                    >
                      Descripcion del egreso
                    </label>
                  </div>
                </div>
              </div>

              <div
                className="buttons-container"
                style={{ display: "flex", gap: "5px", justifyContent: "end" }}
              >
                <button
                  className="btn-search-users"
                  onClick={handleNewExpense}
                  disabled={
                    !newExpense.type ||
                    !newExpense.description ||
                    !newExpense.subOffice ||
                    !newExpense.currency
                  }
                >
                  <label htmlFor="submit" className="label">
                    {" "}
                    {isSubmitting ? <SpinnerSmall /> : "Registrar"}
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
        <div>
          <div className="container-search-purchase">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "3px",
              }}
            >
              {/*
              <div className="input-box-dashboard">
                <input
                  type="text"
                  className="input-field-dashboard"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <label className="label-input-dashboard">
                  Buscar egreso por tipo
                </label>
              </div>
              */}

              <div className="input-box-dashboard">
                <div
                  className={`select-container ${
                    selectType ? "has-value" : ""
                  }`}
                >
                  <select
                    name="typeExpense"
                    className="input-field-dashboard select"
                    value={selectType}
                    onChange={handleChangeType}
                    style={{
                      color: selectType ? "#000" : "#555",
                      cursor: "pointer",
                    }}
                  >
                    <option value="all">Filtre por tipo de egreso</option>
                    {typeExpenses?.map((typeExpense, index) => (
                      <option key={index} value={typeExpense}>
                        {typeExpense}
                      </option>
                    ))}
                  </select>
                  <div className="floating-label">
                    Filtre por tipo de egreso
                  </div>
                </div>
              </div>
              {/* 
              
              <div>
                <DatePicker
                  label="Filtre desde"
                  value={dataForm.dateFrom}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    setDataForm({ ...dataForm, dateFrom: newValue });
                  }}
                />
              </div>
              <div>
                <DatePicker
                  label="Hasta"
                  value={dataForm.dateTo}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    setDataForm({ ...dataForm, dateTo: newValue });
                  }}
                />
              </div>
              */}

              <button className="btn-search-users" onClick={handleFilterType}>
                Buscar{" "}
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
              <button className="btn-clean" onClick={handleCleanFilter}>
                Limpiar{" "}
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
          </div>

          <div className="container-table">
            <div className="tbl-container">
              <table className="tbl-expense">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Usuario</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                    <th>Sucursal</th>
                    <th colSpan="1"></th>
                  </tr>
                </thead>
                <tbody>
                  {(expensesFiltered.length > 0
                    ? expensesFiltered
                    : expenses
                  ).map((expense) => (
                    <tr key={expense._id}>
                      <td data-table="Tipo">
                        <span>{expense.type}</span>
                      </td>
                      <td data-table="Usuario">
                        <span>{expense.user.username}</span>
                      </td>
                      <td data-table="Descripción">
                        <span>{expense.description}</span>
                      </td>
                      <td data-table="Monto">
                        <span> $ {expense.amount.toFixed(2)}</span>
                      </td>
                      <td data-table="Fecha">
                        <span>
                          {new Date(expense.date)
                            .toLocaleString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                            .replace(",", "")}
                        </span>
                      </td>
                      <td data-table="Sucursal">
                        <span>{expense.sub_office.name}</span>
                      </td>
                      {userRol === "administrador" && (
                        <td>
                          <button
                            className="btn-trash"
                            onClick={() => handleDeleteMovement(expense._id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {expensesFiltered.length === 0 && expenses.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        No hay egresos disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Expense;
