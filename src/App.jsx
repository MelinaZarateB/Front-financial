import Login from "./views/Login/Login"
/* Hooks */
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />}>
      </Route>
    </Routes>
    </>
  )
}

export default App
