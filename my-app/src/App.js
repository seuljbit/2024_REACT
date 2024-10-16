import "./App.css"
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/components/Heather";
import Home from "../src/components/Home";
import Comp1 from "../src/components/Comp1";
import Comp2 from "../src/components/Comp2";
import Comp3 from "../src/components/Comp3";
import Footer from "../src/components/Footer";
import Para1 from "../src/components/Para1";
import Para2 from "../src/components/Para2";
import Para3 from "../src/components/Para3";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comp1" element={<Comp1 />} />
            <Route path="/comp2" element={<Comp2 />} />
            <Route path="/comp3" element={<Comp3 />} />
            <Route path="/param/:id/:name" element={<Para1 />} />
            <Route path="/param" element={<Para2 />} />
            <Route path="/param3/:id/:pw" element={<Para3 />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;