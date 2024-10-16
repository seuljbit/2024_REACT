import React from 'react';

const Student2 = (props) => {
    // 구조 분해 할당
    // Home.jsx에서 데이터를 => Student로 전달
    // props : properties의 약어
    // 부모(상위) : 컴포넌트에서 자식(하위) 컴포넌트로 파라미터를 전달
    const {name, age, addr} = props.std;
    return (
        <div className='student2'>
            <h3> {name}({age}) : {addr} </h3>
        </div>
    );
};

export default Student2;