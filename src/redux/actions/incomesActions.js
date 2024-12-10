import axios from "axios";
import Swal from "sweetalert2";
import {
  CREATE_INCOME,
  GET_INCOMES,
  FILTER_INCOME,
  CLEAN_FILTER,
} from "../action-types";

export const cleanFilter = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_FILTER,
      payload: [],
    });
  };
};

export const filterIncome = (typeIncome) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/movements/filter",
        { category: "ingreso", type: typeIncome }
      );
      if (data) {
        dispatch({
          type: FILTER_INCOME,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar filtrar los egresos.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const getIncomes = (ingreso) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/movements/filter",
        { category: "ingreso" }
      );
      if (data) {
        dispatch({
          type: GET_INCOMES,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener los egresos.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const createIncome = (newIncome) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/movements",
        newIncome
      );
      if (data) {
        dispatch({
          type: CREATE_INCOME,
          payload: true,
        });
        Swal.fire({
          text: "El ingreso ha sido registrado.",
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
