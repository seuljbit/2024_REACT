import React from 'react';

const Login = () => {
    const handleLoginClick = () => {
        // 새 창을 열어서 CyHome 컴포넌트를 렌더링할 페이지를 띄웁니다.
        window.open('/cyhome', 'CyHome', 'width=1024,height=516');
    };

    return (
        <div className='login'>
            <div className="login2">
                <div className="idInput">
                    <input type="text" placeholder="아이디" />
                </div>
                <div className="pwInput">
                    <input type="password" placeholder="비밀번호" />
                </div>
                <button onClick={handleLoginClick}> 로그인 </button>
            </div>
        </div>
    );
};

export default Login;