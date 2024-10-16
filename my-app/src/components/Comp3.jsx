import React, { useState, useRef } from 'react';
import {Link} from 'react-router-dom';
import './comp.css'

const Comp3 = () => {
    /* 다른 컴포넌트로 데이터를 넘길 때 props도 있지만
       path를 사용하여 데이터를 넘길 수 있음          
       1) path variable(비동기) : /id/numbering  ex) /comp3/12 
       2) queryString(동기) : /comp3?id=12&name=12   */
    const[inputs, setInputs] = useState({id : '', pw : ''});
    const nameInput = useRef();

    const {id, pw} = inputs;
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

    return (
        <div className='comp3 comp'>
            <div>Comp3.jsx 영역</div>

            <Link to='/Param/15/kim'> path variable </Link>
            <br /> <br />
            <Link to={{pathname:'/param/15/kim'}}> path variable param </Link>
            <br /> <br />

            <Link to='/param?num=1&page=15'> queryString </Link>
            <br /> <br />
            <Link to={{
                pathname : '/param',
                search : '?num=1&page15'
            }}> queryString param  </Link>
            <br /> <br />
            
            {/* id/pw 입력받고 전송버튼을 클릭하여 param3.jsx에 출력 */}
            <input type="text" name='id' placeholder='ID' onChange={textInput} value={id} ref={nameInput} />
            <input type="text" name='pw' placeholder='PassWord' onChange={textInput} value={pw} />
            <Link to={{pathname:`/param3/${id}/${pw}`}}> path variable param </Link>
        </div>
    );
};
export default Comp3;