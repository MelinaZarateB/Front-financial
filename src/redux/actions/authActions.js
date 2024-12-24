import {
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAN_MESSAGE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  LOG_OUT
} from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

export const signUp = (newUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
       // `http://localhost:3000/auth/register`,
       `https://back-financiera.up.railway.app/auth/register`,
        newUser
      );
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
  return async (dispatch) => {
    try {
      const response = await axios.post(
       // `http://localhost:3000/auth/login`,
       `https://back-financiera.up.railway.app/auth/login`,
        user
      );

      if (response) {
        const { access_token, user } = response.data; // Extrae el token y el user
        const { role, username, lastname, _id } = user; // Extrae el rol, nombre y apellido del usuario
        // Guarda el token en localStorage
        localStorage.setItem("token", access_token);
        const userInfo = { username, lastname, role, _id };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

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
  return async () => {
    try {
      const response = axios.post(
       // `http://localhost:3000/auth/forgot-password`,
       `https://back-financiera.up.railway.app/auth/forgot-password`,
        email
      );
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
  return async (dispatch) => {
    try {
      const response = await axios.post(
       // `http://localhost:3000/auth/reset-password?token=${token}`,
       `https://back-financiera.up.railway.app/auth/reset-password?token=${token}`,
        {
          password: password,
        }
      );
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: response.data.message,
      });
    } catch (error) {
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error inesperado";
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
       // `http://localhost:3000/auth/activate?token=${token}`
       `https://back-financiera.up.railway.app/auth/activate?token=${token}`
      );
    } catch (error) {
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error inesperado";

    }
  };
};

export const logOut = (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  dispatch({ type: LOG_OUT });
}