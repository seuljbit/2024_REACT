import React from 'react';
import {student, students} from '../test-app/src/data/data';

const Student = () => {
    // const name = "홍길동";
    // const age = "20";
    // const addr = "seoul"

    return (
        <div className='student'>
            <h3> {student.name}({student.age}) : {student.addr} </h3>
            { // 여기다가 배열을 나타내겠습니다
                students.map(s => (
                    <h3> {s.name}({s.age}) : {s.addr} </h3>
                ))
            }
        </div>
    );
};

export default Student;