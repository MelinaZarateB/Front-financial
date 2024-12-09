import axios from "axios";
import Swal from "sweetalert2";
import { CREATE_EXPENSE, GET_EXPENSES } from "../action-types";

export const getExpenses = (egreso) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/movements/filter", {
          category: egreso
        }
      );
      if (data) {
        dispatch({
          type: GET_EXPENSES,
          payload: data,
        });
      }

    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener los ingresos.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const createExpense = (newExpense) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/movements",
        newExpense
      );
      if (data) {
        dispatch({
          type: CREATE_EXPENSE,
          payload: true,
        });
        Swal.fire({
          text: "El egreso ha sido registrado.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar registrar el ingreso.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
