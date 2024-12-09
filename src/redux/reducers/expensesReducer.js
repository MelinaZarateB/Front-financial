import { CREATE_EXPENSE, GET_EXPENSES } from "../action-types";

let initialState = {
  createdExpense: false,
  expenses: [],
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
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
