import React from 'react';
import Counter from '../components/Counter';
import Input from '../components/Input';
import Input2 from '../components/Input2';
import Color from '../components/Color';
import Counter2 from '../components/Counter2';
const Comp2 = () => {
    // Count 예제
    // Hook : 기능을 할 수 있게 해주는 역할
    // useState() : 상태변화
    return (
        <div className='comp2'>
            <div>Comp2 영역입니다.</div>
            <Counter2 />
            <hr />
            <Counter />
            <hr />
            <Input />
            <hr />
            <Color />
            <hr />
            <Input2 />
        </div>
    );
};
export default Comp2;