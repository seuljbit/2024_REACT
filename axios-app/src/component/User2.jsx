import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

// useReducer로 요청 상태 관리하기
// action type : SUCCESS / ERROR / LOADING
function reducer(state, action) {
    switch(action.type) {
        case 'LOADING' :
            return {
                loading : true,
                data : null,
                error : null
            };
        case 'SUCCESS' :
            return {
                loading : false,
                data : action.data,
                error : null
            };
        case 'ERROR' :
            return {
                loading : false,
                data : null,
                error : action.error
            };
        default : throw new Error(`Unhandled action type : ${action.type}`);
    }
}

const User2 = () => {
    const [ state, dispatch ] = useReducer(reducer, {
        loading : false,
        data : null,
        error : null
    });

    const fetchUsers = async () => {
        try {
            // 요청이 시작되면 loading 상태를 true로 변경
            dispatch({ type : 'LOADING' });
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            console.log(response);
            // setUsers(response.data); // 실제 data는 response.data 안에 담겨 있음
            dispatch({ type : 'SUCCESS', data : response.data })
        } catch (e) {
            dispatch({ type : 'ERROR', error : e })
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const { loading, data:users, error } = state; // state.date => users 키워드로 조회

    if (loading) return <div> 로딩중.... </div>;
    if (error) return <div> 에러가 발생했습니다! </div>;
    if(!users) return <div> User null !! </div>

    return (
        <div className='user2'>
            <ul>
                {users.map(user => (
                    <li key={user.id}> {user.username}({user.name}) : {user.email} </li>
                ))}
            </ul>
            <button onClick={fetchUsers}> 다시 불러오기 </button>
        </div>
    );
};

export default User2;