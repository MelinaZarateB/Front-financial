import {
  GET_CURRENCIES,
  DELETE_CURRENCY,
  UPDATE_CURRENCY_SUBOFFICES,
  DELETE_CURRENCY_SUBOFFICES,
  GET_SUBOFFICES,
  CREATE_SUBOFFICES,
  CLEAN_MESSAGE
} from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

/* Actions para currencies */
export const createSubOffices = (newSubOffice) => {
  return async (dispatch) => {
    try{
      const { data } = await axios.post(
        //'http://localhost:3000/sub_offices',
        "https://back-financiera.up.railway.app/sub_offices", newSubOffice)
      if(data) {
        dispatch({
          type: CREATE_SUBOFFICES,
          payload: data
        })
        Swal.fire({
          title: "Exito",
          text: "Se ha creado exitosamente la subofficina",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }catch(error){
      const mensajeError =
      error.response?.data?.message ||
      "No se pudo crear la subofficina. Por favor, intente nuevamente.";

    Swal.fire({
      title: "Error",
      text: mensajeError,
      icon: "error",
    });

    }
  }

}


export const createCurrencies = (currency) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        //`http://localhost:3000/currencies`,
        `https://back-financiera.up.railway.app/currencies`,
        currency
      );
      if (data) {
        Swal.fire({
          title: "Exito",
          text: "Se ha creado exitosamente la moneda",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "No se pudo crear la monedas. Por favor, intente nuevamente.";

      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
export const getCurrencies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        //"http://localhost:3000/currencies"
         "https://back-financiera.up.railway.app/currencies");
      if (data) {
        dispatch({
          type: GET_CURRENCIES,
          payload: data,
        });
      }
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "No se pudo obtener las monedas. Por favor, intente nuevamente.";

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
        //`http://localhost:3000/currencies/${idCurrency}`
        `https://back-financiera.up.railway.app/currencies/${idCurrency}`
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
      const mensajeError =
        err.response?.data?.message ||
        "No se pudo eliminar la moneda. Por favor, intente nuevamente.";

      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

/* Actions para sucursales */
export const updateStockCurrency = (currencyId, subOfficeId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        //`http://localhost:3000/sub_offices/${subOfficeId}/currencies/${currencyId}`
        `https://back-financiera.up.railway.app/sub_offices/${subOfficeId}/currencies/${currencyId}`
      );
      if (data) {
        dispatch({
          type: UPDATE_CURRENCY_SUBOFFICES,
          payload: true,
        });
        Swal.fire({
          title: "Exito",
          text: "Se ha agregado la moneda a la sucursal",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "No se pudo agregar la moneda. Por favor, intente nuevamente.";

      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};

export const getSubOffices = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        //"http://localhost:3000/sub_offices"
        "https://back-financiera.up.railway.app/sub_offices");
      if (data) {
        dispatch({
          type: GET_SUBOFFICES,
          payload: data,
        });
      }
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "Ocurrio un error al intentar obtenes las sub sucursales.";
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
export const deleteCurrencySubOffice = (currencyId, subOfficeId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
       // `http://localhost:3000/sub_offices/${subOfficeId}/currencies/${currencyId}`
       `https://back-financiera.up.railway.app/sub_offices/${subOfficeId}/currencies/${currencyId}`
      );
      if (data) {
        dispatch({
          type: DELETE_CURRENCY_SUBOFFICES,
          payload: currencyId,
        });
        Swal.fire({
          title: "Exito",
          text: "Se ha eliminado la moneda de la sucursal",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      const mensajeError =
        err.response?.data?.message ||
        "No se pudo eliminar la moneda. Por favor, intente nuevamente.";

      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
      });
    }
  };
};
