import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import subOfficesReducer from "./subOfficesReducer";
import transactionsReducer from "./transactionsReducer";
import cashRegisterReducer from "./cashRegisterReducer";

const rootReducer = combineReducers({
  user: userReducer,       
  auth: authReducer,
  offices: subOfficesReducer,
  transactions: transactionsReducer,
  cashRegister: cashRegisterReducer
});

export default rootReducer;