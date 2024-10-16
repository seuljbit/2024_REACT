import React, { useState } from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]); // 사용자 데이터를 저장하는 상태
    const [loading, setLoading] = useState(false); // 데이터 로딩 상태를 나타내는 상태
    const [error, setError] = useState(null); // 에러 상태를 나타내는 상태

    // 비동기 함수: 사용자 데이터를 가져오는 함수
    const fetchUsers = async () => {
        try {
            setLoading(true); // 요청이 시작되면 loading의 상태를 true로 변경
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data); // 실제 data는 response.data 안에 담겨 있음
            console.log(response);
            console.log(response.data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false); // 로딩 완료 후 상태 변경
        }
    };

    // 컴포넌트가 마운트될 때 데이터를 자동으로 불러오지 않도록 제거
    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    // 버튼 클릭 시 데이터 불러오기
    const onClick = () => {
        fetchUsers();
    };

    if (loading) return <div> 로딩중.... </div>;
    if (error) return <div> 에러가 발생했습니다! </div>;
    // if(!users) return <div> User null !! </div>

    return (
        <div className='user'>
            <div> User.jsx 영역 </div>
            {/* users가 있을 때만 목록을 표시 */}
            {users.length > 0 && (
                <ul>
                    {users.map(user => (
                        <li key={user.id}> {user.username}({user.name}) </li>
                    ))}
                </ul>
            )}
            <button onClick={onClick}> 데이터 불러오기 </button>
        </div>
    );
};

export default User;