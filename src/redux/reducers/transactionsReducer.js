import { GET_TRANSACTIONS } from "../action-types";

let initialState = {}

const transactionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TRANSACTIONS:
            return {
              ...state,
              transactions: action.payload,
            };
            
          default:
            return state;

    }
}
export default transactionsReducer;