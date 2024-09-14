import Login from "./views/Login/Login"
import SignUp from "./views/SignUp/SignUp";
/* Hooks */
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
    </Routes>
    </>
  )
}
export default App
