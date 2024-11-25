import {
  OPEN_CASH_REGISTER,
  VERIFY_CASH_REGISTER,
  DELETE_CURRENCY,
  GET_CURRENCIES,
  VERIFY_CASH_REGISTER_ERROR,
  CLEAR_CASH_REGISTER_ERROR
} from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

/* Actions para caja registradora */
export const clearCashRegisterError = () => ({
  type: CLEAR_CASH_REGISTER_ERROR,
});

export const getCurrencies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3000/currencies");
      if (data) {
        dispatch({
          type: GET_CURRENCIES,
          payload: data,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "No se pudo obtener las monedas. Por favor, intente nuevamente.",
        icon: "error",
      });
    }
  };
};
export const updateMultipleStockCurrencies = (subOfficeId, currencyId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/sub_offices/${subOfficeId}/currencies/${currencyId}`
      );
    } catch (err) {}
  };
};
export const deleteCurrency = (idCurrency) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/currencies/${idCurrency}`
      );
      if (data) {
        dispatch({
          type: DELETE_CURRENCY,
          payload: idCurrency,
        });
        Swal.fire({
          title: "Exito",
          text: "Se ha eliminado exitosamente la moneda",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la moneda. Por favor, intente nuevamente.",
        icon: "error",
      });
    }
  };
};
export const verifyCashRegisterOpen = (idSubOffice) => {
  console.log("verificadora de caja abierta", idSubOffice);
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/cash-register/current/${idSubOffice}`
      );
      if (data) {
        dispatch({
          type: VERIFY_CASH_REGISTER,
          payload: data,
        });
      }
      console.log("datos de la caja abierta a verificar", data);
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "No hay cajas abiertas para esta sucursal.";
        console.log('mensaje error caja', mensajeError)
      dispatch({
        type: VERIFY_CASH_REGISTER_ERROR,
        payload: mensajeError, 
      });

      /*Swal.fire({
        title: "Error",
        text: mensajeError, // Mostrar el mensaje del backend
        icon: "error",
      });*/
    }
  };
};

export const closeCashRegister = (idCashRegister) => {
  console.log("id de caja registradora a cerrar", idCashRegister);
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/cash-register/close/${idCashRegister}`
      );
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "No se cerrar la caja. Por favor, intente nuevamente.";
      Swal.fire({
        title: "Error",
        text: mensajeError, // Mostrar el mensaje del backend
        icon: "error",
      });
    }
  };
};

export const openCashRegister = (dataOpen) => {
  console.log("data para abrir caja", dataOpen);
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/cash-register/start`,
        dataOpen
      );
      console.log(data);
      if (data) {
        dispatch({
          type: OPEN_CASH_REGISTER,
          payload: true,
        });
      }
    } catch (err) {
      // Obtener el mensaje del servidor o usar un mensaje genérico si no está disponible
      const mensajeError =
        err.response?.data?.message ||
        "No se pudo abrir caja. Por favor, intente nuevamente.";

      Swal.fire({
        title: "Error",
        text: mensajeError, // Mostrar el mensaje del backend
        icon: "error",
      });
    }
  };
};
