import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
