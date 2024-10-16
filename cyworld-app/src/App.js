import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CyHome from './components/CyHome';
import './css/home.css';
import './css/main.css';
import './css/diary.css';
import './css/diaryWrite.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cyhome/*" element={<CyHome />} />  {/* 상대 경로 설정 */}
            </Routes>
        </Router>
    );
};

export default App;