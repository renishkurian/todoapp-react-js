import React from "react";
import "./resources/css/Home.css";

import { useDataStore } from "../DataStore/DataStore";
import Login from "./Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./DashBoard";
function Home() {
  const [{ isLogin, isHome }] = useDataStore();
  return (
    <div className={!isLogin ? "Login" : "dashboardContainer"}>
      {!isLogin && isHome && <Login />}
      {isLogin && isHome && <DashBoard />}
      <ToastContainer />
    </div>
  );
}

export default Home;
