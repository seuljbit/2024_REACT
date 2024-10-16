import React from "react";
import { BrowserRouter } from "react-router-dom";
import BoardHome from './components/BoardHome';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BoardHome />
      </BrowserRouter>
    </div>
  );
}

export default App;
