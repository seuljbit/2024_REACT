import React from 'react';

const Friends = (props) => {
    const {name, phone, addr, job} = props.std;
    return (
        <div>
            <h3> {name}({job}) // {addr} / {phone}  </h3>
        </div>
    );
};

export default Friends;