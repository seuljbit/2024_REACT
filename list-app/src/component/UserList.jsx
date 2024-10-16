import React, {useRef, useState, useMemo} from 'react';
import User from '../component/User';
import CreateUser from './CreateUser';

const UserList = () => {
    const nextId = useRef(6);

    const [users, setUsers] = useState([
        { id: 1, username: '김민지', email: '111@naver.com', active : true },
        { id: 2, username: '팜하니', email: '222@naver.com', active : true },
        { id: 3, username: '강해린', email: '333@naver.com', active : false },
        { id: 4, username: '다니엘', email: '444@naver.com', active : false },
        { id: 5, username: '이혜인', email: '555@naver.com', active : false }
    ]);

    const [ inputs, setInputs ] = useState({
        username : '',
        email : ''
    });

    const { username, email } = inputs;
    // const username = inputs.username;
    // const email = inputs.eamil;
    // 객체의 구조를 분해하여 변수에 할당하는 방법 : 구조 분해 할당

    const onChange = (e) => {
        const { name, value } = e.target;
        // 변경되지 않은 대상값을 공백처리 => 기존값 유지
        setInputs({
            ...inputs, // 기존 inputs 값을 가지고 와서 복사
            [name] : value // 현재 변경된 값을 key:value 형태로 set
        });
        console.log(inputs);
    }


    const onCreate = () => {
        // 값이 추가되면......
        // 새로운 사용자 추가 로직 구현
        // .current : 현재값
        const user = {
            id : nextId.current,
            username, // key명과 변수명이 같으면 하나만 써도 알아서 인식함
            email : email
        };
        
        // 현재 users에 user 추가 => concat(연결)
        setUsers(users.concat(user));

        // 기존 inputs 창 초기화
        setInputs({
            username : '',
            email : ''
        })

        nextId.current += 1; // ref() : 재랜더링 x
        console.log(users);
    }


    const onRemove = (id) => {
        // filter : 배열의 요소를 제거하기 위해서 사용
        // frilter는 조건에 맞는 것만 배열로 리턴(이 번호만 빼고 리턴해줘)
        // 보내진 user.id가 일치하지 않는 원소만 추출하여 새로운 배열로 리턴
        // 리턴을 하겠다는 것은 set을 하겠다는 것
        setUsers(users.filter(user => user.id !== id));
    }

    const onToggle = (id) => {
        // map : 배열의 처리를 하여 배열로 리턴
        // foreach : 배열의 처리만 하고 리턴하지 않음
        // user.id가 파라미터의 id와 일치하면 active의 상태를 반전시켜줌
        setUsers(
            users.map(user => (
                user.id === id ? {
                    ...user,
                    active : !user.active
                } : user
            ))
        );
    }
    
    const countActiveUser = (users) => {
        // user.active가 true인 사용자를 세어서 리턴
        // let count = 0;
        // users.forEach(user => {
        //     if (user.active === true) {
        //         count++;
        //     }
        // });
        // console.log(count);
        console.log("active User count")
        return users.filter(user => user.active).length;
    }

    const count = useMemo(() => countActiveUser(users), [users]);


    return (
        <div className='userList'>
            {/* 컴포넌트에서 데이터를 하위 컴포넌트에게 전달하는 방법 = props */}
            <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
            {/* {
                users.map((u, i)=> (
                    <User user={u} key={i}/>
                ))
            } */}
            {
                users.map(u => (
                    < User user={u} key={u.id} onRemove={onRemove} onToggle={onToggle} count={count}/>
                ))
            }
            <div className='user userCountText'> <span className='text'> 완료 사용자수 : {count} </span> </div>
        </div>
    );
};

export default UserList;