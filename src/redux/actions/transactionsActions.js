import {
  GET_TRANSACTIONS,
  CREATE_TRANSACTIONS,
  DELETE_TRANSACTION,
  GET_TRANSACTIOS_FOR_DAY,
  GET_TRANSACTIONS_RANGE_DATE,
} from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

/* Actions para transacciones */

export const getTransactionsRangeDate = (subOfficeId, dateFrom, dateTo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/transactions/${subOfficeId}/dateRange/${dateFrom}/${dateTo}`
      );
      console.log(data);
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener las transacciones";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const createTransactions = (transaction) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/transactions/`,
        transaction
      );
      if (data) {
        dispatch({
          type: CREATE_TRANSACTIONS,
          payload: true,
        });
        Swal.fire({
          text: "La transaccion ha sido creada.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "Ocurrio un error al intentar registrar la transacción";
      console.log(mensajeError);
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
/* Action para eliminar transacción */
export const deleteTransaction = (transactionId) => {
  return async (dispatch) => {
    try {
      //const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `http://localhost:3000/transactions/${transactionId}`
        /* {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }*/
      );
      if (data) {
        dispatch({
          type: DELETE_TRANSACTION,
          payload: true,
        });

        Swal.fire({
          title: "Eliminado",
          text: "La transaccion ha sido eliminada.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar eliminar la transacción";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const getTransactions = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3000/transactions");
      console.log(data);
      if (data) {
        dispatch({
          type: GET_TRANSACTIONS,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener las transacciones";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const getTransactionsForDay = (subOfficeId, date) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/transactions/${subOfficeId}/forDay/${date}`
      );
      if (data) {
        dispatch({
          type: GET_TRANSACTIOS_FOR_DAY,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar filtrar las transacciones";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const getTransactionsForMonth = () => {};
