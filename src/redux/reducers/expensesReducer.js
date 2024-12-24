import {
  CREATE_EXPENSE,
  GET_EXPENSES,
  FILTER_EXPENSE,
  CLEAN_FILTER,
  ADD_DEBT,
} from "../action-types";

let initialState = {
  createdExpense: false,
  expenses: [],
  expensesFiltered: [],
  addDebt: false,
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DEBT:
      return {
        ...state,
        addDebt: state.addDebt ? false : action.payload,
      };

    case CLEAN_FILTER:
      return {
        ...state,
        expensesFiltered: action.payload,
      };
    case FILTER_EXPENSE:
      return {
        ...state,
        expensesFiltered: action.payload,
      };
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case CREATE_EXPENSE:
      return {
        ...state,
        createdExpense: state.createdExpense ? false : action.payload,
      };
    default:
      return state;
  }
};
export default expensesReducer;
