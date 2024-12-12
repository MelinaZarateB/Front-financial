import { GET_CLIENTS, CREATE_CLIENTS, DELETE_CLIENTS } from "../action-types";

let initialState = {
  clients: [],
  deleteClient: false
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {

    case DELETE_CLIENTS:
      return{
        ...state,
        deleteClient: state.deleteClient ? false : action.payload
      }
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
