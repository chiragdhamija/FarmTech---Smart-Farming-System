import React from "react";
import Navbar from "./Navbar";

import Home from "./Home"
import Graphs from "./Graphs";
import Features from "./Features";
import Alerts from "./Alerts";
import Timeline from "./Timeline";
import About from "./About";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/graphs" element={<Graphs />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/alerts" element={<Alerts />}></Route>
        <Route path="/timeline" element={<Timeline />}></Route>
        <Route path="/about" element={<About />}></Route>

      </Routes>
    </Router>
  );
}

export default App;



