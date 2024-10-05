import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CLEAN_MESSAGE,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  GET_ALL_USERS
} from "./action-types";

let initialState = {
  signUpStatus: null,
  signUpMessage: "",
  loginMessage: "",
  changePasswordMessage: {},
  users: []
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return{
        ...state,
        users: action.payload
      }
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordMessage: {
          success: false,
          message: action.payload, // Mensaje que viene del backend para el fallo
        },
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordMessage: {
          success: true,
          message: action.payload, // Mensaje que viene del backend para el éxito
        },
      };
    case CLEAN_MESSAGE:
      return {
        ...state,
        loginMessage: "",
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpMessage: action.payload,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpMessage: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginMessage: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginMessage: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;
