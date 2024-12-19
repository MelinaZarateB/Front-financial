import {
  OPEN_CASH_REGISTER,
  CLOSE_CASH_REGISTER,
  VERIFY_CASH_REGISTER,
  DELETE_CURRENCY,
  GET_CURRENCIES,
  VERIFY_CASH_REGISTER_ERROR,
  CLEAR_CASH_REGISTER_ERROR,
  GET_TRANSACTIONS_AND_MOVEMENTS,
  CLEAN_FILTER,
  FILTER_MOVEMENTS_FOR_DAY,
  CLEAN_MESSAGE,
  TOTAL_MOVEMENTS_FOR_DAY,
  TOTAL_TRANSACTIONS_FOR_DAY
} from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

/* Actions para caja registradora */
export const totalMovementsForDay = (subOfficeId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/cash-register/${subOfficeId}/total-movements-for-day`
      );
      console.log('TOTAL MOVIMIENTOS POR DIA', data)
      if(data){
        dispatch({
          type: TOTAL_MOVEMENTS_FOR_DAY,
          payload: data
        })
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener los movimientos del día.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const totalTransactionsForDay = (subOfficeId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/cash-register/${subOfficeId}/total-transactions-for-day`
      );
      console.log('TOTAL TRANSACTIONES POR DIA', data)
      if(data){
        dispatch({
          type: TOTAL_TRANSACTIONS_FOR_DAY,
          payload: data
        })
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar obtener las transacciones del día.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const cleanMessage = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_MESSAGE,
      payload: false,
    });
  };
};

export const clearTransactionsAndMovements = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_FILTER,
      payload: [],
    });
  };
};

export const filterTransactiosAndMovements = (subOfficeId, filterData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/cash-register/${subOfficeId}/transaction-and-movements-for-day`,
        filterData
      );
      if (data) {
        dispatch({
          type: FILTER_MOVEMENTS_FOR_DAY,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar filtrar las operaciones del día.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
export const getTransactionsAndMovements = (subOfficeId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/cash-register/${subOfficeId}/transaction-and-movements-for-day`
      );
      if (data) {
        dispatch({
          type: GET_TRANSACTIONS_AND_MOVEMENTS,
          payload: data,
        });
      }
    } catch (error) {
      const mensajeError =
        error.response?.data?.message ||
        "Ocurrio un error al intentar traer las operaciones del día.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

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
export const updateMultipleStockCurrencies = (subOfficeId, updates) => {
  return async (dispatch) => {
    try {
      const payload = { updates };
      const { data } = await axios.put(
        `http://localhost:3000/sub_offices/${subOfficeId}/currencies/`,
        payload
      );
      console.log("Monedas actualizadas:", data);
    } catch (err) {
      console.error(
        "Error actualizando monedas:",
        err.response?.data || err.message
      );
    }
  };
};
export const updateMultipleCurrencies = (updates) => {
  return async (dispatch) => {
    try {
      const payload = { updates };
      const { data } = await axios.put(
        `http://localhost:3000/currencies/multiple`,
        payload
      );
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "Ocurrio un error al actualizar los stocks";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
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
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "No hay cajas abiertas para esta sucursal.";
      console.log("mensaje error caja", mensajeError);
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

export const closeCashRegister = (idCashRegister, usdRate, arsRate) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/cash-register/close/${idCashRegister}`,
        {
          usd_rate: usdRate,
          ars_rate: arsRate,
        }
      );
      if (data) {
        dispatch({
          type: CLOSE_CASH_REGISTER,
          payload: data,
        });
      }
      console.log(data);
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
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/cash-register/start`,
        dataOpen
      );
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
