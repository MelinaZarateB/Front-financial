import { CREATE_EXPENSE, GET_EXPENSES, FILTER_EXPENSE, CLEAN_FILTER } from "../action-types";

let initialState = {
  createdExpense: false,
  expenses: [],
  expensesFiltered: [],
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {

    case CLEAN_FILTER:
      return{
        ...state,
        expensesFiltered: action.payload
      }
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
