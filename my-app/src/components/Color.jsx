import React, { useState } from 'react';

const Color = () => {
    // input 값으로 색을 입력하면 해당 색으로 변경하는 useState 생성
    const [color, setColor] = useState("");
    const [color2, setColor2] = useState("");

    return (
        <div className='color'>
            <h3 style={{color : color2}}> Color Change Example </h3>
            <input type="text" onChange={(e)=>{setColor(e.target.value)}}/>
            <button onClick={()=>{setColor2(color)}}> set </button>
        </div>
    );
};

export default Color;