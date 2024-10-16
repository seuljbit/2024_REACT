import React from 'react';
import Student from "./Student";
import Student2 from "./Student2";
import Friends from "./Friends";
import Test4 from "./Test4";
import { student, students, friends } from '../test-app/src/data/data';

const Home = () => {
    // Home.jsx에서 데이터를 => Student로 전달
    // props : properties의 약어
    // 부모(상위) : 컴포넌트에서 자식(하위) 컴포넌트로 파라미터를 전달
    return (
        <div className='home'>
            {/* <div> Home.jsx Area </div> */}
            <Test4 name="react" color="red"/>
            <Test4 color="red"/>
            <hr />
            <Student />
            <hr />
            <Student2 std = {student} />
            <hr />
            { 
                /* student 배열 중 객체 1개를 뽑아 student2 std={} */
                students.map(s => (
                    <Student2 std = {s} />
                ))
            }
            <hr />
            {
                friends.map(s => (
                    <Friends std = {s}/>
                ))
            }
        </div>
    );
};

export default Home;