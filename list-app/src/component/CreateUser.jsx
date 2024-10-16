import React from 'react';
import '../component/UserCss.css';

// {username, email, onChange, onCreate}
const CreateUser = ({username, email, onChange, onCreate}) => {
    return (
        <div className='createName'>
            <input
                type="text"
                name='username'
                placeholder='이름'
                onChange={onChange}
                value={username}
            /> <span> </span>
            <input
                type="text"
                name='email'
                placeholder='이메일'
                onChange={onChange}
                value={email}
            /> <span> </span>
            <button onClick={onCreate}> CREATE </button>
        </div>
    );
};

export default CreateUser;