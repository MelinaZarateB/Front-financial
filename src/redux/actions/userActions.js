import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  DELETE_USER_SUCCESS,
  CLEAN_FILTER_USER_BY_EMAIL,
  SEARCH_USER_BY_EMAIL,
  GET_ALL_USERS,
  CLEAN_MESSAGE,
  UPDATE_USER
} from "../action-types";
import axios from "axios";
import Swal from "sweetalert2";

export const cleanMessage = () => {
  return {
    type: CLEAN_MESSAGE,
    payload: "",
  };
};

/* Actions para usuarios comunes */
export const updateUser = (userId, updateField) => {
  return async (dispatch) => {
    try{
      const { data } = await axios.put(`http://localhost:3000/users/update-user/${userId}`, updateField)
      if(data){
        dispatch({
          type: UPDATE_USER,
          payload: data
        })
        Swal.fire({
          text: "El usuario ha sido actualizado.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }catch(error){
      const mensajeError =
      error.response?.data?.message ||
      "Ocurrio un error al intentar actualizar el usuario.";
    Swal.fire({
      title: "Error",
      text: mensajeError,
      icon: "error",
    });
    }
  };
};

export const registerUser = (newUser) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/users`, newUser);
      if (data) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: true,
        });
      }
      Swal.fire({
        text: "El usuario ha sido creado.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (error) {
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error inesperado";
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: message,
      });
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
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
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error al intentar eliminar un usuario.";
        Swal.fire({
          title: "Error",
          text: message,
          icon: "error",
        });
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
      if (data) {
        dispatch({
          type: GET_ALL_USERS,
          payload: data,
        });
      }
    } catch (error) {
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error al intentar obtener los usuarios.";
        Swal.fire({
          title: "Error",
          text: message,
          icon: "error",
        });
    }
  };
};

export const searchUserByEmail = (email) => {
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
      const message = error.response && error.response.data.message;
      error.response && error.response.data.message
        ? error.response.data.message
        : "Ocurrio un error inesperado";
        Swal.fire({
          title: "Error",
          text: message,
          icon: "error",
        });
    }
  };
};
