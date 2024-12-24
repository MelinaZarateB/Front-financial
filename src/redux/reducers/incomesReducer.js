import {
  CREATE_INCOME,
  GET_INCOMES,
  FILTER_INCOME,
  CLEAN_FILTER,
  ADD_PAYMENT,
} from "../action-types";

let initialState = {
  createdIncome: false,
  incomes: [],
  incomesFiltered: [],
  addPayment: false,
};

const incomesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PAYMENT:
      return {
        ...state,
        addPayment: state.addPayment ? false : action.payload,
      };

    case CLEAN_FILTER:
      return {
        ...state,
        incomesFiltered: action.payload,
      };

    case FILTER_INCOME:
      return {
        ...state,
        incomesFiltered: action.payload,
      };

    case GET_INCOMES:
      return {
        ...state,
        incomes: action.payload,
      };
    case CREATE_INCOME:
      return {
        ...state,
        createdIncome: state.createdIncome ? false : action.payload,
      };
    default:
      return state;
  }
};
export default incomesReducer;
