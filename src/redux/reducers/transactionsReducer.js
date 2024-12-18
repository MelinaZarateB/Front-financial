import {
  GET_TRANSACTIONS,
  CREATE_TRANSACTIONS,
  DELETE_TRANSACTION,
  GET_TRANSACTIONS_RANGE_DATE
} from "../action-types";

let initialState = {
  transactions: [],
  createTransactionsSuccess: false,
  deleteTransactionsSuccess: false,
};

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_RANGE_DATE:
      return{
        ...state,
        transactions: action.payload
      }
    case DELETE_TRANSACTION:
      return {
        ...state,
        deleteTransactionsSuccess: state.deleteTransactionsSuccess
        ? false // Si es true, primero lo seteas a false
        : action.payload, // Luego, lo actualizas con action.payload
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case CREATE_TRANSACTIONS:
      return {
        ...state,
        createTransactionsSuccess: state.createTransactionsSuccess
          ? false // Si es true, primero lo seteas a false
          : action.payload, // Luego, lo actualizas con action.payload
      };
    default:
      return state;
  }
};
export default transactionsReducer;
