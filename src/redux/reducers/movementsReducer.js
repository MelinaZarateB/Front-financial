import { GET_ALL_MOVEMENTS, DELETE_MOVEMENT } from "../action-types";

let initialState = {
  movements: [],
  deleteMovement: false,
};

const movementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MOVEMENTS:
      return {
        ...state,
        movements: action.payload,
      };
    case DELETE_MOVEMENT:
      return {
        ...state,
        deleteMovement: action.payload,
      };

    default:
      return state;
  }
};
export default movementsReducer;
