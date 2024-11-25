
import { OPEN_CASH_REGISTER, VERIFY_CASH_REGISTER, VERIFY_CASH_REGISTER_ERROR, CLEAR_CASH_REGISTER_ERROR } from "../action-types";

let initialState = { openCashRegister: false, verifyCashRegister: [], error: '' };

const cashRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_CASH_REGISTER:
      return {
        ...state,
        verifyCashRegister: action.payload,
        erorr: ''
      };
      case VERIFY_CASH_REGISTER_ERROR:
        return{
          ...state,
          error: action.payload
        }
        case CLEAR_CASH_REGISTER_ERROR:
          return {
            ...state,
            error: '', // Limpia el error al seleccionar una nueva sucursal
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
