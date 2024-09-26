import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import ChangePassword from "./views/ChangePassword/ChangePassword";
import SignUpVerification from "./views/SignUpVerification/SignUpVerification";
import RestorePassword from "./views/RestorePassword/RestorePassword";
import Dashboard from "./views/Dashboard/Dashboard";

/* Hooks */
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/check-email" element={<SignUpVerification />}></Route>
        <Route path="/restore-password" element={<RestorePassword />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}
export default App;
