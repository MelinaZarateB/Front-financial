import {
  OPEN_CASH_REGISTER,
  CLOSE_CASH_REGISTER,
  VERIFY_CASH_REGISTER,
  VERIFY_CASH_REGISTER_ERROR,
  CLEAR_CASH_REGISTER_ERROR,
  GET_ALL_MOVEMENTS,
  GET_TRANSACTIONS_AND_MOVEMENTS,
  CLEAN_FILTER,
  FILTER_MOVEMENTS_FOR_DAY
} from "../action-types";

let initialState = {
  openCashRegister: false,
  closedCashRegister: false,
  verifyCashRegister: [],
  error: "",
  transactionsAndMovements: [],
};

const cashRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_MOVEMENTS_FOR_DAY:
      return{
        ...state,
        transactionsAndMovements: action.payload
      }
    case CLEAN_FILTER:
      return{
        ...state,
        transactionsAndMovements: [],
        verifyCashRegister: []
      }
    case GET_TRANSACTIONS_AND_MOVEMENTS:
      return {
        ...state,
        transactionsAndMovements: action.payload,
      };
    case VERIFY_CASH_REGISTER:
      return {
        ...state,
        verifyCashRegister: action.payload,
        erorr: "",
      };
    case VERIFY_CASH_REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_CASH_REGISTER_ERROR:
      return {
        ...state,
        error: "", // Limpia el error al seleccionar una nueva sucursal
      };

    case CLOSE_CASH_REGISTER:
      return {
        ...state,
        closedCashRegister: action.payload,
      };

    case OPEN_CASH_REGISTER:
      return {
        ...state,
        openCashRegister: action.payload,
      };

    default:
      return state;
  }
};
export default cashRegisterReducer;
