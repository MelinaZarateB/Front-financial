import { CREATE_INCOME } from "../action-types";

let initialState = {
    createdIncome : false
};

const incomesReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_INCOME: 
        return{
            ...state,
            createdIncome: action.payload
        }
        default:
            return state;
    }

}
export default incomesReducer;