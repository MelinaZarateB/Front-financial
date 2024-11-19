import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CLEAN_MESSAGE,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  GET_ALL_USERS,
  SEARCH_USER_BY_EMAIL,
  CLEAN_FILTER_USER_BY_EMAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  DELETE_USER_SUCCESS,
  GET_TRANSACTIONS,
  GET_SUBOFFICES,
  DELETE_CURRENCY_SUBOFFICES,
  GET_CURRENCIES,
  DELETE_CURRENCY,
  UPDATE_CURRENCY_SUBOFFICES,
  OPEN_CASH_REGISTER
} from "./action-types";

let initialState = {
  signUpStatus: null,
  signUpMessage: "",
  loginMessage: "",
  userRole: "",
  changePasswordMessage: {},
  users: [],
  userByEmail: {},
  registerUser: {},
  deleteUserSuccess: "",
  transactions: [],
  subOffices: [],
  currencies: [],
  updateCurrencies: false,
  openCashRegister: false

};

const Reducer = (state = initialState, action) => {
  switch (action.type) {

    case OPEN_CASH_REGISTER:
      return{
        ...state,
        openCashRegister: action.payload
      }

    case UPDATE_CURRENCY_SUBOFFICES:
      return {
        ...state,
        updateCurrencies: state.updateCurrencies 
          ? false // Si es true, primero lo seteas a false
          : action.payload, // Luego, lo actualizas con action.payload
      };

    case DELETE_CURRENCY_SUBOFFICES:
      return {
        ...state,
        subOffices: state.subOffices.map((subOffice) => {
          // Si el subOffice actual tiene la lista de currencies
          return {
            ...subOffice,
            currencies: subOffice.currencies.filter(
              (currency) => currency.currency._id !== action.payload
            ),
          };
        }),
      };    
    case DELETE_CURRENCY: {
      return{
        ...state,
        currencies: state.currencies.filter((currency) => currency._id !== action.payload)
      }
    }
    case GET_CURRENCIES: {
      return {
        ...state,
        currencies: action.payload,
      };
    }

    case GET_SUBOFFICES:
      return {
        ...state,
        subOffices: action.payload,
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
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
        loginMessage: action.payload.isAuthenticated, // Almacena el mensaje true o false
        userRole: action.payload.role,
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
