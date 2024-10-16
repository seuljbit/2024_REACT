import React, { useState, useRef } from 'react';

const Input2 = () => {
    const[inputs, setInputs] = useState({name : '', nickname : ''});
    const nameInput = useRef();
    // href는 연결 대상을 찾아 연결해 주는 것
    // useref는 DOM에서 어떤 엘리먼트를 직접 선택해야 할 경우 사용

    // 구조 분해 할당
    const {name, nickname} = inputs;
    const textInput = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);

        const {name, value} = e.target;
        // 변경대상이 아닌 값은 공백처리 => 기존값 유지
        setInputs({
            ...inputs, // 기존값 복사
            [name] : value // name 키를 가진 값을 value로 변경
        });
    }

    const resetBtn = () => {
        setInputs({name : '', nickname : ''});
        nameInput.current.focus();
    }

    return (
        <div className='input'>
            <h3> name : {name} / nickName : {nickname} </h3>
            <input type="text" name='name' value={name} placeholder='이름' onChange={textInput} ref={nameInput}/> <span > </ span>
            <input type="text" name='nickname' value={nickname} placeholder='닉네임' onChange={textInput} />
            <button type='reset' onClick={resetBtn}> 초기화 </button>
        </div>
    );
};

export default Input2;