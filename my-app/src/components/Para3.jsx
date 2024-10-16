import React from 'react';
import './comp.css';
import { useParams } from 'react-router-dom';

const Para3 = () => {
    const { id, pw } = useParams();
    return (
        <div className='param3'>
            <div> Param3.jsx 영역 </div>
            <h3> path variable : {id} / {pw} </h3>
        </div>
    );
};

export default Para3;