import React from 'react';
import '../component/todolistCss.css'

const Create = ({todotext, todoselect, onChange, onCreate}) => {
    return (
        <div className='toDoListCreate'>
            <h3 className='title'> To Do List </h3>
            <input
                    type="text"
                    name='todoselect'
                    className='todoselect'
                    placeholder='카테고리'
                    onChange={onChange}
                    value={todoselect}
                />
            <input
                type="text"
                name='todotext'
                className='todotext'
                placeholder='할 일'
                onChange={onChange}
                value={todotext}
            />
            <button onClick={onCreate}> CREATE </button>
        </div>
    );
};

export default Create;