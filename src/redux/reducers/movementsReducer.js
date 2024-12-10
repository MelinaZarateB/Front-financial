import {
  GET_ALL_MOVEMENTS,
  DELETE_MOVEMENT,
  FILTER_MOVEMENT,
  CLEAN_FILTER,
} from "../action-types";

let initialState = {
  movements: [],
  deleteMovement: false,
  movementsFiltered: [],
};

const movementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_FILTER:
      return {
        ...state,
        movementsFiltered: action.payload,
      };
    case FILTER_MOVEMENT:
      return {
        ...state,
        movementsFiltered: action.payload,
      };
    case GET_ALL_MOVEMENTS:
      return {
        ...state,
        movements: action.payload,
      };
    case DELETE_MOVEMENT:
      return {
        ...state,
        deleteMovement: state.deleteMovement ? false : action.payload,
      };

    default:
      return state;
  }
};
export default movementsReducer;
