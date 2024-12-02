import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import subOfficesReducer from "./subOfficesReducer";
import transactionsReducer from "./transactionsReducer";
import cashRegisterReducer from "./cashRegisterReducer";
import clientsReducer from "./clientsReducer";

const rootReducer = combineReducers({
  user: userReducer,       
  auth: authReducer,
  offices: subOfficesReducer,
  transactions: transactionsReducer,
  cashRegister: cashRegisterReducer,
  clients: clientsReducer
});

export default rootReducer;