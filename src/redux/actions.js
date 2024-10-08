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
  DELETE_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from "./action-types";
import axios from "axios";

export const registerUser = (newUser) => {
  console.log(newUser)
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

export const deleteUser = () => {
  try {
  } catch (error) {
    console.log(error);
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
      console.log("try", response);
      if (response) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: true,
        });
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
