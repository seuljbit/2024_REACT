import React from 'react';

// const Test4 = (props) => {
//     return (
//         <div className='test4'>
//             <h1 style={{color : props.color}}> Hello~!! {props.name} </h1>
//         </div>
//     );
// };

// 둘 다 같은 의미, 구조 분해 할당 방식

const Test4 = ({name, color}) => {
    return(
        <div className="test4">
            <h1 style={{color : color}}> Hello~ {name}</h1>
        </div>
    )
};
/*
props를 지정하고 값이 들어오지 않은 경우 빈 값으로 처리
defaultProps로 기본값 설정
*/

Test4.defaultProps = {
    name : '아무개'
};

export default Test4;