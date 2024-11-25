import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  DELETE_USER_SUCCESS,
  CLEAN_FILTER_USER_BY_EMAIL,
  SEARCH_USER_BY_EMAIL,
  GET_ALL_USERS,
  CLEAN_MESSAGE
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
