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
} from "./action-types";
import axios from "axios";
import Swal from 'sweetalert2'


export const updateUser = (userId) => {
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
  console.log('userId de la action', userId)
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      console.log('Token en la action:', token); 

      if(token){
        const { data } = await axios.delete(
          `http://localhost:3000/users/delete-user/${userId}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if(data) {
            Swal.fire({
              title: 'Eliminado',
              text: 'El usuario ha sido eliminado.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
           dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
           })
          }
      }
     //const { data } = await axios.delete(`http://localhost:3000/users/delete-user/${userId}`)
    } catch (error) {
      console.log(error);
    }
  }
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
