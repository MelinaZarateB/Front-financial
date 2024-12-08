import { GET_CLIENTS } from "../action-types";

let initialState = {
  clients: [],
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    default:
      return state;
  }
};
export default clientsReducer;