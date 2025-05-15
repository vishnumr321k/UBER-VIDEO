import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignin from "./pages/CaptainSignin";
import Start from "./pages/Start";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import { UserDataContext } from "./context/UserContext";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";


function App() {
  const ans = useContext(UserDataContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignin />} />
        <Route
          path="/user/logout"
          element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>}
        ></Route>
        <Route path="/captain-home" element = {<CaptainHome/>} />
      </Routes>
    </div>
  );
}

export default App;
