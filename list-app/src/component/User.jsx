import React from 'react';
import '../component/UserCss.css';

const User = ({ user, onRemove, onToggle }) => {
    // 스타일을 별도의 객체로 분리하여 가독성 향상
    const usernameStyle = {
        cursor: 'pointer',
        color: user.active ? 'green' : 'black'
    };

    return (
        <div className='user'>
            <h3>
                <div className="hover">
                    <samp>({user.id}) 이름 : </samp>
                    <samp 
                        style={usernameStyle} 
                        onClick={() => onToggle(user.id)}
                    >
                        {' ' + user.username + ' '}
                    </samp>
                </div>
                <samp className="hover">({user.email})</samp>
                <button onClick={() => onRemove(user.id)}>X</button>
            </h3>
        </div>
    );
};

export default User;