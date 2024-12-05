import { CREATE_EXPENSE } from "../action-types";

let initialState = {
  createdExpense: false,
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EXPENSE:
      return {
        ...state,
        createdExpense: action.payload,
      };
    default:
      return state;
  }
};
export default expensesReducer;
