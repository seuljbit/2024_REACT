import React from 'react';
import './comp.css';
import { useParams } from 'react-router-dom';

const Para1 = () => {

    // path variable 값으로 파라미터를 추출
    const { id, name } = useParams();
    return (
        <div className='param1'>
            <div> Param1.jsx 영역 </div>
            <h3> path variable : {id} / {name} </h3>
        </div>
    );
};

export default Para1;