import {
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  CLEAN_MESSAGE,
  ACTIVATE_ACCOUNT,
  RESTORE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  SEARCH_USER_BY_EMAIL,
  GET_ALL_USERS,
  CLEAN_FILTER_USER_BY_EMAIL,
  DELETE_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  UPDATE_USER,
  GET_TRANSACTIONS,
  DELETE_TRANSACTION,
  CREATE_EXPENSE,
  CREATE_INCOME,
  GET_SUBOFFICES,
  DELETE_CURRENCY_SUBOFFICES,
  CREATE_CURRENCIES,
  GET_CURRENCIES,
  DELETE_CURRENCY,
  UPDATE_CURRENCY_SUBOFFICES,
  OPEN_CASH_REGISTER,
  CLOSE_CASH_REGISTER,
} from "./action-types";
import axios from "axios";
import Swal from "sweetalert2";

/* Actions para caja registradora */
export const closeCashRegister = (idCashRegister) => {
  console.log('id de caja registradora a cerrar', idCashRegister)
  return async (dispatch) => {
    try{
      const { data } = await axios.put(`http://localhost:3000/cash-register/close/${idCashRegister}`)
    }catch(err){
      const mensajeError =
      err.response?.data?.message ||
      "No se cerrar la caja. Por favor, intente nuevamente.";
    Swal.fire({
      title: "Error",
      text: mensajeError, // Mostrar el mensaje del backend
      icon: "error",
    });

    }
  }

}

export const openCashRegister = (dataOpen) => {
  console.log("data para abrir caja", dataOpen);
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/cash-register/start`,
        dataOpen
      );
      console.log(data)
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

/* Actions para currencies */
export const createCurrencies = (currency) => {
  console.log("moneda a crear:", currency);
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/currencies`,
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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};
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

/* Actions para sucursales */
export const updateStockCurrency = (currencyId, subOfficeId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/sub_offices/${subOfficeId}/currencies/${currencyId}`
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
      Swal.fire({
        title: "Error",
        text: "No se pudo agregar la moneda. Por favor, intente nuevamente.",
        icon: "error",
      });
    }
  };
};

export const getSubOffices = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3000/sub_offices");
      console.log("sub sucursales", data);
      if (data) {
        dispatch({
          type: GET_SUBOFFICES,
          payload: data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteCurrencySubOffice = (currencyId, subOfficeId) => {
  console.log(currencyId, subOfficeId);
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/sub_offices/${subOfficeId}/currencies/${currencyId}`
      );
      console.log(data);
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
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la moneda. Por favor, intente nuevamente.",
        icon: "error",
      });
    }
  };
};

/* Actions para Egresos - Ingresos */
export const createIncome = (income) => {
  console.log("action de income:", income);
};

export const createExpense = (expense) => {
  console.log("action de expense:", expense);
};

/* Actions para transacciones */
export const deleteTransaction = (transactionId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = axios.detele(
        `http://localhost:3000/transactions/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        Swal.fire({
          title: "Eliminado",
          text: "La transaccion ha sido eliminada.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {}
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
      console.log(error);
    }
  };
};

/* Actions para usuarios comunes */
export const updateUser = (userId, updateField) => {
  return (dispatch) => {
    console.log(userId);
  };
};

export const registerUser = (newUser) => {
  console.log(newUser);
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/users`, newUser);
      if (data) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error inesperado";
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: message,
      });
      console.log(message);
    }
  };
};

export const deleteUser = (userId) => {
  console.log("userId de la action", userId);
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token en la action:", token);

      if (token) {
        const { data } = await axios.delete(
          `http://localhost:3000/users/delete-user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data) {
          Swal.fire({
            title: "Eliminado",
            text: "El usuario ha sido eliminado.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data,
          });
        }
      }
      //const { data } = await axios.delete(`http://localhost:3000/users/delete-user/${userId}`)
    } catch (error) {
      console.log(error);
    }
  };
};
export const cleanFilterUserByEmail = () => {
  return {
    type: CLEAN_FILTER_USER_BY_EMAIL,
    payload: {},
  };
};
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3000/users/");
      console.log("try", data);
      if (data) {
        dispatch({
          type: GET_ALL_USERS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchUserByEmail = (email) => {
  console.log(email, "action email");
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/users/email/${email}`
      );
      if (data) {
        dispatch({
          type: SEARCH_USER_BY_EMAIL,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const signUp = (newUser) => {
  console.log(newUser);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/register`,
        newUser
      );
      console.log("try", response);
      if (response) {
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error inesperado";
      dispatch({
        type: SIGN_UP_FAILURE,
        payload: message,
      });
    }
  };
};

export const login = (user) => {
  console.log(user);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/login`,
        user
      );

      if (response) {
        const { access_token, user } = response.data; // Extrae el token y el user
        const { role } = user; // Extrae el rol del usuario
        // Guarda el token en localStorage
        localStorage.setItem("token", access_token);

        // Despacha el éxito del login y pasa el rol del usuario
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            isAuthenticated: true,
            role: role,
          },
        });
        // Configura el token para futuras solicitudes en Axios
        /*  axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;*/
      }
    } catch (error) {
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error inesperado";
      console.log("catch", message);
      dispatch({
        type: LOGIN_FAILURE,
        payload: message,
      });
    }
  };
};
export const restorePassword = (email) => {
  console.log(email);
  return async () => {
    try {
      const response = axios.post(
        `http://localhost:3000/auth/forgot-password`,
        email
      );
      console.log("try", response);
    } catch (error) {
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error inesperado";
      console.log("catch", message);
    }
  };
};

export const changePasswordAction = (token, password) => {
  console.log(token, password);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/reset-password?token=${token}`,
        {
          password: password,
        }
      );
      console.log(response.data.message);
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: response.data.message,
      });
    } catch (error) {
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error inesperado";
      console.log("catch", message);
      dispatch({
        type: CHANGE_PASSWORD_FAILURE,
        payload: message,
      });
    }
  };
};
export const cleanMessage = () => {
  return {
    type: CLEAN_MESSAGE,
    payload: "",
  };
};
export const activateAccount = (token) => {
  return async (dispatch) => {
    try {
      const response = axios.get(
        `http://localhost:3000/auth/activate?token=${token}`
      );
      console.log(response);
    } catch (error) {
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error inesperado";
      console.log(message);
    }
  };
};
