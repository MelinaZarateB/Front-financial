import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import ChangePassword from "./views/ChangePassword/ChangePassword";
import SignUpVerification from "./views/SignUpVerification/SignUpVerification";
import RestorePassword from "./views/RestorePassword/RestorePassword";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Spinner from "./utils/Spinner/Spinner";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/check-email" element={<SignUpVerification />} />
        <Route path="/restore-password" element={<RestorePassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width:'100%', height: '100vh'}}><Spinner /></div>}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;