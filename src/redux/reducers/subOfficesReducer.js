import {
  GET_SUBOFFICES,
  DELETE_CURRENCY_SUBOFFICES,
  GET_CURRENCIES,
  DELETE_CURRENCY,
  UPDATE_CURRENCY_SUBOFFICES,
} from "../action-types";

let initialState = {
  subOffices: [],
  currencies: [],
  updateCurrencies: false,
};

const subOfficesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENCY_SUBOFFICES:
      return {
        ...state,
        updateCurrencies: state.updateCurrencies
          ? false // Si es true, primero lo seteas a false
          : action.payload, // Luego, lo actualizas con action.payload
      };

    case DELETE_CURRENCY_SUBOFFICES:
      return {
        ...state,
        subOffices: state.subOffices.map((subOffice) => {
          // Si el subOffice actual tiene la lista de currencies
          return {
            ...subOffice,
            currencies: subOffice.currencies.filter(
              (currency) => currency.currency._id !== action.payload
            ),
          };
        }),
      };
    case DELETE_CURRENCY: {
      return {
        ...state,
        currencies: state.currencies.filter(
          (currency) => currency._id !== action.payload
        ),
      };
    }
    case GET_CURRENCIES: {
      return {
        ...state,
        currencies: action.payload,
      };
    }

    case GET_SUBOFFICES:
      return {
        ...state,
        subOffices: action.payload,
      };

    default:
      return state;
  }
};
export default subOfficesReducer;
