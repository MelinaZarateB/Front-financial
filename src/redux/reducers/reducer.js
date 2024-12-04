import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import subOfficesReducer from "./subOfficesReducer";
import transactionsReducer from "./transactionsReducer";
import cashRegisterReducer from "./cashRegisterReducer";
import clientsReducer from "./clientsReducer";
import movementsReducer from "./movementsReducer";

const rootReducer = combineReducers({
  user: userReducer,       
  auth: authReducer,
  offices: subOfficesReducer,
  transactions: transactionsReducer,
  cashRegister: cashRegisterReducer,
  clients: clientsReducer,
  movements: movementsReducer
});

export default rootReducer;