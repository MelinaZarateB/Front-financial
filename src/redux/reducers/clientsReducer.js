import { GET_CLIENTS, CREATE_CLIENTS } from "../action-types";

let initialState = {
  clients: [],
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CLIENTS:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
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
