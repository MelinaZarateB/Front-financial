import {
  GET_ALL_USERS,
  SEARCH_USER_BY_EMAIL,
  CLEAN_FILTER_USER_BY_EMAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  DELETE_USER_SUCCESS,
  CLEAN_MESSAGE
} from "../action-types";

let initialState = {
  users: [],
  userByEmail: {},
  registerUser: {},
  deleteUserSuccess: "",
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserSuccess: state.deleteUserSuccess !== "" ? "" : action.payload, // Si deleteUser no está vacío, lo
      };
    case CLEAN_MESSAGE:
      return {
        ...state,
        registerUser: {},
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUser: {
          success: true,
          message: "Usuario registrado con exito",
        },
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        registerUser: {
          success: false,
          message: action.payload,
        },
      };
    case CLEAN_FILTER_USER_BY_EMAIL:
      return {
        ...state,
        userByEmail: action.payload,
      };
    case SEARCH_USER_BY_EMAIL:
      return {
        ...state,
        userByEmail: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
