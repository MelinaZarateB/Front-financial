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

export const logOut = (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  dispatch({ type: LOG_OUT });
}