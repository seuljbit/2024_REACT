import React from 'react';
import { Route, Routes, Link } from "react-router-dom";
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardWrite from './BoardWrite';
import BoardModify from './BoardModify';
import '../components/board-style.css';

const BoardHome = () => {
    return (
        <div className='boardHome'>
            <div className="homeTitle">
                <Link to='/' className='titleLink'>
                    <h1> My first React Board Project </h1>
                </Link>
            </div>
            <div className="fullbox">
                <div className='content'>
                    <Routes>
                        <Route path='/' element={<BoardList />} />
                        <Route path='/List' element={<BoardList />} />
                        <Route path='/Detail/:id' element={<BoardDetail />} />
                        <Route path='/Write' element={<BoardWrite />} />
                        <Route path='/Modify/:id' element={<BoardModify />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default BoardHome;
