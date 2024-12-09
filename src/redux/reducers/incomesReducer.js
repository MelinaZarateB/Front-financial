import { CREATE_INCOME, GET_INCOMES } from "../action-types";

let initialState = {
  createdIncome: false,
  incomes: []
};

const incomesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INCOMES:
      return{
        ...state,
        incomes: action.payload
      }
    case CREATE_INCOME:
      return {
        ...state,
        createdIncome: state.createdIncome ? false : action.payload
      };
    default:
      return state;
  }
};
export default incomesReducer;
