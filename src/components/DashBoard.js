import React from "react";
// import { useDataStore } from "../DataStore/DataStore";
import Header from "./Header";
import SideBar from "./SideBar";
import "./resources/css/DashBoard.css";
import { useDataStore } from "../DataStore/DataStore";
import Todo from "./Todo";
function DashBoard() {
  const [{ hideSideBar }] = useDataStore();
  return (
    <div className="dashboard">
      {hideSideBar && (
        <div className="sideBar">
          <SideBar />
        </div>
      )}
      <div className="body">
        <div className="header">
          <Header />
        </div>
        <div className="content">
          <Todo />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
