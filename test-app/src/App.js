import React from "react";
import Header from "../../components/Header";
import Home from "../../components/Home";
import Footer from "../../components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "../../components/Test";
import Test2 from "../../components/Test2";
import Test3 from "../../components/Test3";
import Test4 from "../../components/Test4";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/test' element={<Test />} />
            <Route path='/test2' element={<Test2 />} />
            <Route path='/test3' element={<Test3 />} />
            <Route path='/test4' element={<Test4 name="홍길동" color="red"/>} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
