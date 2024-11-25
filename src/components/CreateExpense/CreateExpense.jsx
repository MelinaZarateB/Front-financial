import './CreateExpense.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanMessage, createExpense } from "../../redux/actions/expensesActions";
import SpinnerSmall from './../../utils/Spinner/SpinnerSmall';

const CreateExpense = ({ handleCreateExpense }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
     // dispatch(cleanMessage());
    };
  }, []);
  /*useEffect(() => {
    if (stateRegisterUser.success) {
      setNewUser({
        username: "",
        lastname: "",
        password: "",
        email: "",
        phone: "",
        isActive: true,
        role: "user",
      });
    }
  }, [stateRegisterUser.success]); // Ejecuta este efecto cuando cambia stateRegisterUser.success*/

  const [newExpense, setNewExpense] = useState({
    type: "",
    username: "",
    description: "",
    amount: "",
    date: "",
    subOffice: ""
  });

  /* Handlers */
  const handleChange = (event) => {
    setNewExpense({
      ...newExpense,
      [event.target.name]: event.target.value,
    });
  };
  const handleSendInputs = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(createExpense(newExpense));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container-parent-create-user">
      <div className="container-create-user">
        <div className="input-create-user">
          <label htmlFor="" className="label-create-user">
            Nombre
          </label>
          <input
            type="text"
            name="username"
            value={newExpense.username}
            className="input-create-user-principal"
            onChange={handleChange}
          />
        </div>
        <div className="input-create-user">
          <label htmlFor="" className="label-create-user">
            Descripción
          </label>
          <input
            type="text"
            name="lastname"
            value={newExpense.description}
            className="input-create-user-principal"
            onChange={handleChange}
          />
        </div>
        <div className="input-create-user">
          <label htmlFor="" className="label-create-user">
            Monto
          </label>
          <input
            type="text"
            name="phone"
            value={newExpense.amount}
            className="input-create-user-principal"
            onChange={handleChange}
          />
        </div>

        <div className="input-create-user">
          <label htmlFor="" className="label-create-user">
            Sucursal
          </label>
          <input
            type="text"
            name="password"
            value={newExpense.subOffice}
            className="input-create-user-principal"
            onChange={handleChange}
          />
        </div>
        <div style={{ paddingTop: "7px" }}>
          {stateRegisterUser.success ? (
            <p style={{ color: "green", marginTop: "-20px" }}>
              {stateRegisterUser.message}
            </p>
          ) : (
            <p style={{ color: "red", marginTop: "-20px" }}>
              {stateRegisterUser.message}
              {stateRegisterUser.message ? (
                <span style={{ marginLeft: "5px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-exclamation-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                  </svg>
                </span>
              ) : (
                ""
              )}
            </p>
          )}
        </div>
        <div className="container-buttons-create-user">
          <button
            className="btn-submit-create-user"
            onClick={handleSendInputs}
            disabled={
              !newExpense.type ||
              !newExpense.username ||
              !newExpense.amount ||
              !newExpense.subOffice ||
              !newExpense.description
            }
          >
            <label htmlFor="submit" className="label" >
              {" "}
              {isSubmitting ? <SpinnerSmall /> : "Registrar usuario"}
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
          <button
            className="btn-submit-create-user"
            onClick={() => handleCreateExpense()}
          >
            Volver{" "}
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
    </section>
  );
};
export default CreateExpense;
